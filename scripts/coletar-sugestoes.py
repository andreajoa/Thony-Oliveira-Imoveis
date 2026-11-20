#!/usr/bin/env python3
"""Captura sugestões públicas do Google Suggest relacionadas a imóveis em Goiânia.
Não mede volume de buscas, posição orgânica, concorrência nem geolocalização exata.
Execute: python3 scripts/coletar-sugestoes.py
"""
import concurrent.futures
import csv
import datetime
import json
import pathlib
import urllib.parse
import urllib.request

SEEDS = [
    "imóveis em goiânia", "imóveis goiânia", "apartamento à venda em goiânia",
    "apartamentos em goiânia", "casas à venda em goiânia", "casa em goiânia",
    "imobiliária em goiânia", "corretor de imóveis em goiânia", "apartamento na planta goiânia",
    "lançamentos imobiliários goiânia", "imóveis setor bueno goiânia",
    "apartamento setor bueno goiânia", "apartamento setor marista goiânia",
    "casa condomínio fechado goiânia", "terreno à venda goiânia", "aluguel em goiânia",
    "imóveis para alugar em goiânia", "imóveis em aparecida de goiânia", "imóveis baratos goiânia",
    "apartamento 2 quartos goiânia", "apartamento 3 quartos goiânia",
    "imóveis em goiânia até 300 mil", "lote em goiânia", "Thony Oliveira imóveis",
    "Oliveira Digital Imóveis", "Thony Oliveira", "Thony Oliveira imóveis Goiânia",
    "Thony Oliveira Conecta", "TO Imóveis Goiás", "Casa TO", "Oliveira & Cerrado Imóveis",
    "TO Digital Imóveis", "imobiliária goiânia", "imóveis a venda goiânia",
    "apartamentos setor bueno goiânia", "imóveis comerciais goiânia",
    "condomínio fechado goiânia", "sobrado em goiânia", "apartamentos setor jardim goiás",
    "apartamentos lançamento marista goiânia", "imóveis para vender em goiânia",
]
def fetch(q):
    params = urllib.parse.urlencode({"client":"firefox","hl":"pt-BR","gl":"br","q":q})
    request = urllib.request.Request("https://suggestqueries.google.com/complete/search?"+params,headers={"User-Agent":"Mozilla/5.0"})
    try:
        with urllib.request.urlopen(request,timeout=15) as resp:
            data=json.loads(resp.read().decode("utf-8"))
        return {"consulta":q,"sugestoes":data[1],"erro":None}
    except Exception as exc:
        return {"consulta":q,"sugestoes":[],"erro":str(exc)}
def classify(q):
    s=q.lower()
    if any(t in s for t in ["thony", "casa to", "oliveira digital", "oliviera", "to digital", "to imóveis", "cerrado"]):
        return ("Marca","/")
    if "alugar" in s or "aluguel" in s or "locação" in s:
        return ("Aluguel","/explorar/imoveis-em-goiania/")
    districts=[
        ("setor bueno","imoveis-setor-bueno-goiania"),("setor marista","imoveis-setor-marista-goiania"),
        ("jardim goiás","imoveis-jardim-goias"),("jardim goias","imoveis-jardim-goias"),
        ("parque amazônia","imoveis-parque-amazonia"),("setor oeste","imoveis-setor-oeste-goiania")
    ]
    for word,slug in districts:
        if word in s:return ("Bairro","/explorar/"+slug+"/")
    if "aparecida" in s:return ("Cidade","/explorar/imoveis-em-aparecida-de-goiania/")
    if "condomínio" in s or "condominio" in s:return ("Condomínio","/explorar/casas-em-condominio-fechado-goiania/")
    if "na planta" in s or "lançamento" in s:return ("Lançamentos","/explorar/apartamentos-na-planta-goiania/")
    if "terreno" in s or "lote " in s:return ("Terreno","/explorar/terrenos-a-venda-em-goiania/")
    if "2 quartos" in s:return ("Quartos","/explorar/apartamentos-2-quartos-goiania/")
    if "3 quartos" in s:return ("Quartos","/explorar/apartamentos-3-quartos-goiania/")
    if "apartamento" in s:return ("Apartamento","/explorar/apartamentos-a-venda-em-goiania/")
    if "casa " in s or "casas " in s:return ("Casa","/explorar/casas-a-venda-em-goiania/")
    return ("Geral","/explorar/imoveis-em-goiania/")
out=pathlib.Path("seo");out.mkdir(parents=True,exist_ok=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: data=list(pool.map(fetch,SEEDS))
(out/"consultas-google-suggest.json").write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding="utf-8")
with (out/"mapa-palavras-chave.csv").open("w",newline="",encoding="utf-8-sig") as f:
    writer=csv.writer(f);writer.writerow(["Palavra-chave sugerida","Consulta de origem","Intenção inicial (heurística)","Página proposta","Fonte","Medição de volume?"])
    for r in data:
        for suggestion in r["sugestoes"]:
            intent,page=classify(suggestion)
            writer.writerow([suggestion,r["consulta"],intent,page,"Google Suggest; hl=pt-BR, gl=br","Não"])
print("Consultas:",len(data),"Sugestões:",sum(len(x["sugestoes"]) for x in data),"Falhas:",sum(bool(x["erro"]) for x in data))
