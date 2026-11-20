import React,{Suspense,useEffect,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import * as THREE from 'three';
import { ArrowRight, MousePointer2 } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
const steps=[
 {eyebrow:'ETAPA 01 / 05',title:'Tudo começa aqui.',sub:'Um terreno. Uma ideia. Infinitas possibilidades.'},
 {eyebrow:'ETAPA 02 / 05',title:'A base dos sonhos.',sub:'A estrutura começa a ganhar forma.'},
 {eyebrow:'ETAPA 03 / 05',title:'Paredes que acolhem.',sub:'Os ambientes encontram seu lugar.'},
 {eyebrow:'ETAPA 04 / 05',title:'Os detalhes importam.',sub:'Cobertura, esquadrias e acabamento.'},
 {eyebrow:'ETAPA 05 / 05',title:'Sua próxima história.',sub:'Do terreno vazio ao lugar para chamar de lar.'},
];
const clamp=(x)=>Math.max(0,Math.min(1,x));
function B({args,position,color='#e6dfcf',opacity=1,metalness=0}){return <mesh position={position} castShadow receiveShadow><boxGeometry args={args}/><meshStandardMaterial color={color} metalness={metalness} roughness={.8} transparent={opacity<1} opacity={opacity}/></mesh>}
function Tree({x,z}){return <group position={[x,0,z]}><mesh position={[0,.72,0]}><cylinderGeometry args={[.1,.17,1.45,7]}/><meshStandardMaterial color="#735e44"/></mesh><mesh position={[0,1.84,0]}><icosahedronGeometry args={[.78,1]}/><meshStandardMaterial color="#54785e" flatShading/></mesh></group>}
function StagedBuild({progress}){
 const base=useRef(),walls=useRef(),roof=useRef(),finishes=useRef(),garden=useRef();
 useFrame(({clock})=>{
 const p=progress.current;
 const foundation=clamp((p-.07)/.16);
 const w=clamp((p-.25)/.22);
 const r=clamp((p-.51)/.20);
 const f=clamp((p-.69)/.18);
 const g=clamp((p-.78)/.17);
 if(base.current){base.current.scale.y=Math.max(.001,foundation);base.current.position.y=-.085+(1-foundation)*-.15;}
 if(walls.current)walls.current.scale.y=Math.max(.001,w);
 if(roof.current){roof.current.position.y=3.15+(1-r)*3.6;roof.current.scale.set(1,Math.max(.001,r),1);}
 if(finishes.current)finishes.current.scale.y=Math.max(.001,f);
 if(garden.current) garden.current.scale.setScalar(Math.max(.001,g));
 });
 return <group rotation={[0,-.32,0]}>
   <B args={[17,.08,14]} position={[0,-.3,0]} color="#a4af94"/>
   <B args={[9.6,.05,11]} position={[-.35,-.24,-.1]} color="#baab90"/>
   <group ref={base}><B args={[8.7,.28,8.6]} position={[0,-.10,0]} color="#c4c4b8"/><B args={[7.9,.09,7.9]} position={[0,.12,0]} color="#eee9de"/></group>
   <group ref={walls} position={[0,.15,0]}>
     <B args={[.35,3.15,8]} position={[-3.95,1.58,0]} color="#e5dac8"/>
     <B args={[.35,3.15,8]} position={[3.95,1.58,0]} color="#e5dac8"/>
     <B args={[7.9,3.15,.35]} position={[0,1.58,-4]} color="#e7dbcb"/>
     <B args={[1.75,3.15,.35]} position={[-3.08,1.58,4]} color="#eadfcc"/>
     <B args={[1.75,3.15,.35]} position={[3.08,1.58,4]} color="#eadfcc"/>
     <B args={[7.9,.38,.35]} position={[0,3,4]} color="#eadfcc"/>
     <B args={[.28,3.15,6.3]} position={[0,1.58,-.65]} color="#dac8b2"/>
     <B args={[4.4,.16,1.3]} position={[0,2.76,-1.8]} color="#a08a70"/>
   </group>
   <group ref={roof} position={[0,3.15,0]}>
    <B args={[9,.35,9]} position={[0,0,0]} color="#4b5149"/>
    <B args={[9.5,.18,9.5]} position={[0,.21,0]} color="#7c816e"/>
    <B args={[9,.16,.44]} position={[0,-.12,4.35]} color="#c19a67"/>
   </group>
   <group ref={finishes}>
    <B args={[4.8,2.35,.15]} position={[0,1.44,4.22]} color="#54706b" opacity={.82} metalness={.25}/>
    <B args={[.11,2.45,.23]} position={[-1.5,1.44,4.2]} color="#f8f1e3"/>
    <B args={[.11,2.45,.23]} position={[1.5,1.44,4.2]} color="#f8f1e3"/>
    <B args={[4.8,.12,.23]} position={[0,1.44,4.2]} color="#f8f1e3"/>
    <B args={[2,.12,.23]} position={[0,2.57,4.18]} color="#c0a780"/>
    <B args={[3,.12,.23]} position={[0,.3,4.18]} color="#c0a780"/>
    <B args={[1,.13,1.1]} position={[0,-.06,5.15]} color="#d3b899"/>
    <B args={[2,.13,1.1]} position={[0,-.06,6.28]} color="#d3b899"/>
    <B args={[.7,2.8,.45]} position={[-3.15,1.42,4.39]} color="#b48b65"/>
    <B args={[.7,2.8,.45]} position={[3.15,1.42,4.39]} color="#b48b65"/>
    <mesh position={[0,2.55,4.35]}><sphereGeometry args={[.11,12,8]}/><meshStandardMaterial color="#ffdc91" emissive="#e6b66f" emissiveIntensity={2}/></mesh>
   </group>
   <group ref={garden}>
      <Tree x={-5.6} z={-2.65}/><Tree x={5.5} z={-3.1}/>
      <Tree x={-5.6} z={3.45}/>
      <B args={[3,.06,3.1]} position={[-3.5,-.22,5.6]} color="#6f936c"/>
      <B args={[3,.06,3.1]} position={[3.5,-.22,5.6]} color="#6f936c"/>
      {[-1.2,0,1.2].map((x)=><B key={x} args={[.9,.06,1.05]} position={[x,-.18,7.0]} color="#b3ab95"/>)}
   </group>
 </group>
}
function CameraIdle({progress}){
 const vec=new THREE.Vector3();
 useFrame(({camera},delta)=>{
 const p=progress.current;const theta=0.2+p*.18;
 vec.set(14.7*Math.sin(theta),8.2-p*1.2,14.7*Math.cos(theta));
 camera.position.lerp(vec,Math.min(1,delta*2.5));camera.lookAt(0,1.2,0);
 });return null;
}
export default function HouseBuild(){
 const story=useRef(null),progress=useRef(0),[step,setStep]=useState(0);
 useEffect(()=>{
 const t=ScrollTrigger.create({trigger:story.current,start:'top top',end:'bottom bottom',onUpdate(s){progress.current=s.progress;setStep(Math.min(4,Math.floor(s.progress*5)));}});
 return ()=>t.kill();
 },[]);
 return <section className="scroll-story build-story" id="terreno-ganha-vida" ref={story} aria-label="Construção 3D ilustrativa controlada por rolagem">
  <div className="sticky-viewport build-viewport">
   <div className="build-grid" aria-hidden="true"/>
   <div className="build-canvas" aria-hidden="true">
    <Canvas camera={{position:[4,8,16],fov:45,near:.1,far:100}} dpr={[1,1.6]} shadows gl={{antialias:true,alpha:true}}>
      <ambientLight intensity={2}/><hemisphereLight intensity={1.4} color="#ffffff" groundColor="#acb6a3"/>
      <directionalLight position={[9,18,12]} intensity={2.8} castShadow shadow-mapSize={[1024,1024]}/>
      <Suspense fallback={null}><StagedBuild progress={progress}/><CameraIdle progress={progress}/></Suspense>
    </Canvas>
   </div>
   <div className="story-topline dark"><span>UMA VISÃO DO FUTURO</span><span>DO PROJETO AO LAR · DEMONSTRAÇÃO</span></div>
   <div className="build-story-copy">
    <span className="eyebrow"><span className="tiny-circle"/> VOCÊ IMAGINA. A GENTE APROXIMA.</span>
    <h2>Um terreno.<br/><em>Mil possibilidades.</em></h2>
    <p>Deslize para acompanhar o terreno se transformar em casa — da fundação ao último detalhe. Role para cima e desmonte tudo.</p>
    <div className="build-step-card">
      <span>{steps[step].eyebrow}</span><h3>{steps[step].title}</h3><p>{steps[step].sub}</p>
      <div className="build-step-track">{steps.map((s,i)=><i key={i} className={i<=step?'active':''}/>)}</div>
    </div>
   </div>
   <span className="build-micro">CONCEITO ARQUITETÔNICO · 3D EM TEMPO REAL</span>
  </div>
 </section>;
}
