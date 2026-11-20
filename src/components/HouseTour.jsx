import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ArrowDown, ArrowUpRight, MoveDown } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);
const stages = [
  { eyebrow: '01 / 04 · CHEGADA', name: 'Da rua para dentro', detail: 'Uma arquitetura pensada para receber.' },
  { eyebrow: '02 / 04 · VIVER', name: 'Sala de estar', detail: 'Onde as melhores histórias começam.' },
  { eyebrow: '03 / 04 · CONVIVER', name: 'Cozinha integrada', detail: 'Os pequenos rituais fazem uma casa.' },
  { eyebrow: '04 / 04 · DESCANSAR', name: 'Suíte principal', detail: 'Seu refúgio, no seu ritmo.' },
];
function Box({ position, args, color, metalness=0, roughness=0.83, castShadow=true }) {
  return <mesh position={position} castShadow={castShadow} receiveShadow><boxGeometry args={args}/><meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/></mesh>;
}
function Window({ z, x }) {
  return <group position={[x,2.85,z]}>
    <Box args={[0.07,2.6,4]} position={[0,0,0]} color="#829a90" metalness={0.3} roughness={0.18}/>
    {[-1.25,0,1.25].map((a,i)=><Box key={i} args={[.13,2.7,.07]} position={[0,0,a]} color="#243d39"/>)}
    <Box args={[.15,.09,4]} position={[0,0,0]} color="#243d39"/>
  </group>;
}
function Plant({ position, scale=1 }) {
  return <group position={position} scale={scale}>
    <mesh position={[0,.29,0]}><cylinderGeometry args={[.27,.2,.58,10]}/><meshStandardMaterial color="#b78a63"/></mesh>
    <mesh position={[0,1,0]} castShadow><sphereGeometry args={[.52,8,7]}/><meshStandardMaterial color="#617c56" roughness={1}/></mesh>
    <mesh position={[-.2,1.39,.1]} castShadow><sphereGeometry args={[.29,7,6]}/><meshStandardMaterial color="#90a071"/></mesh>
  </group>;
}
function Sofa({position=[0,0,0]}) {
 return <group position={position}>
  <Box position={[0,.52,0]} args={[3.6,.72,1.22]} color="#d7c9b8"/>
  <Box position={[0,1.13,-.42]} args={[3.6,.85,.42]} color="#c9b9a6"/>
  <Box position={[-1.65,.93,0]} args={[.35,.6,1.35]} color="#c9b9a6"/>
  <Box position={[1.65,.93,0]} args={[.35,.6,1.35]} color="#c9b9a6"/>
  <Box position={[-.72,1.03,.13]} args={[.72,.2,.63]} color="#e8ded0"/>
  <Box position={[.72,1.03,.13]} args={[.72,.2,.63]} color="#ad977f"/>
 </group>;
}
function DiningChairs({z=-5.5}) {
 return <group>
   <Box position={[0,.84,z]} args={[2.25,.13,1.26]} color="#85674b"/>
   {[[-1.25,z], [1.25,z]].map(([x,zp],i)=><group position={[x,0,zp]} key={i}>
    <Box position={[0,.48,0]} args={[.78,.12,.8]} color="#a98e74"/>
    <Box position={[i===0?-.35:.35,.9,0]} args={[.12,.9,.8]} color="#a98e74"/>
   </group>)}
   {[-.88,.88].map((x,i)=><group key={i} position={[x,0,z]}>
     <Box position={[0,3.18,0]} args={[.032,1,.032]} color="#584d41"/>
     <mesh position={[0,2.64,0]}><sphereGeometry args={[.25,12,8]}/><meshStandardMaterial color="#e6cd9b" emissive="#bda26e" emissiveIntensity={0.5}/></mesh>
   </group>)}
 </group>;
}
function TourHouse() {
 return <group>
  <Box args={[30,.28,39]} position={[0,-.22,-4]} color="#b9bdad"/>
  <Box args={[12,.36,29]} position={[0,0,-4]} color="#a2876e"/>
  <Box args={[10.4,.1,26.6]} position={[0,.2,-4]} color="#efe9dc"/>
  <Box args={[1.8,4.6,27]} position={[-5.92,2.38,-4]} color="#eae4d7"/>
  <Box args={[1.8,4.6,27]} position={[5.92,2.38,-4]} color="#eae4d7"/>
  <Box args={[2.2,4.8,1.1]} position={[-4.2,2.55,9.9]} color="#e6dfd1"/>
  <Box args={[2.2,4.8,1.1]} position={[4.2,2.55,9.9]} color="#e6dfd1"/>
  <Box args={[11.4,.38,1.3]} position={[0,4.98,9.7]} color="#ad967d"/>
  <Box args={[.38,5.1,1.1]} position={[-2.9,2.45,9.7]} color="#e6dfd1"/>
  <Box args={[.38,5.1,1.1]} position={[2.9,2.45,9.7]} color="#e6dfd1"/>
  <Box args={[10.5,.24,1.25]} position={[0,4.79,-1.85]} color="#bb9b75"/>
  <Box args={[10.5,.24,1.25]} position={[0,4.79,-10.4]} color="#bb9b75"/>
  <Box args={[2.45,4.65,.3]} position={[-4.05,2.48,-1.85]} color="#f5ebdc"/>
  <Box args={[2.45,4.65,.3]} position={[4.05,2.48,-1.85]} color="#f5ebdc"/>
  <Box args={[2.45,4.65,.3]} position={[-4.05,2.48,-10.4]} color="#f5ebdc"/>
  <Box args={[2.45,4.65,.3]} position={[4.05,2.48,-10.4]} color="#f5ebdc"/>
  <Window x={-5.02} z={5.3}/><Window x={5.02} z={-6.5}/>
  <Box position={[0,.25,5.6]} args={[7,.04,5]} color="#c4b29c"/>
  <Sofa position={[-.6,0,5.5]}/>
  <Box position={[.2,.49,7.8]} args={[2,.25,.9]} color="#9a7658"/>
  <Box position={[.2,.27,7.8]} args={[.28,.43,.28]} color="#9a7658"/>
  <Box position={[0,2.55,9.1]} args={[2.1,1.22,.09]} color="#263e38"/>
  <Plant position={[4.1,0,3.8]} scale={.88}/>
  <Box position={[0,.26,-5.5]} args={[7,.04,5]} color="#dfd7c8"/>
  <DiningChairs z={-5.5}/>
  <Box position={[-3.18,1,-8.65]} args={[2.25,1.8,1.23]} color="#b8ad9b"/>
  <Box position={[-3.18,1.96,-8.65]} args={[2.3,.1,1.32]} color="#635a4c"/>
  <Box position={[3.1,1,-8.65]} args={[2.3,1.8,1.2]} color="#b8ad9b"/>
  <Box position={[3.1,1.96,-8.65]} args={[2.3,.1,1.3]} color="#635a4c"/>
  <Plant position={[-4.1,0,-4.5]} scale={.65}/>
  <Box position={[0,.3,-15.5]} args={[6,.07,5.5]} color="#cdc5b5"/>
  <Box position={[0,.82,-15.6]} args={[4.15,.65,2.65]} color="#e7e0d4"/>
  <Box position={[0,1.25,-16.7]} args={[4.25,1.18,.35]} color="#d3c2ad"/>
  <Box position={[0,1.18,-15.5]} args={[3.75,.21,2.3]} color="#faf8f2"/>
  <Box position={[-1.27,1.31,-16.1]} args={[1,.16,.52]} color="#b7c3bc"/>
  <Box position={[1.27,1.31,-16.1]} args={[1,.16,.52]} color="#b7c3bc"/>
  <Box position={[3.7,.65,-16.9]} args={[.75,1.1,.65]} color="#bba58e"/>
  <Plant position={[-4,0,-17]} scale={.68}/>
  <Box position={[0,2.5,-18.2]} args={[10.4,4.8,.26]} color="#d4ccbf"/>
  <Box position={[0,4.82,-4]} args={[11.1,.24,28]} color="#e8e1d7" />
  <Box position={[-6.7,.04,12.6]} args={[2,.15,7]} color="#67916d"/>
  <Box position={[6.7,.04,12.6]} args={[2,.15,7]} color="#67916d"/>
  <Plant position={[6.4,0,12]} scale={1.1}/>
  <Plant position={[-6.4,0,12]} scale={.93}/>
  <Box position={[0,-.01,14.2]} args={[4.5,.08,5]} color="#c2b19b"/>
 </group>
}
function CameraMove({progress}) {
 const target=new THREE.Vector3();
 useFrame(({camera},delta)=>{
   const p=progress.current;
   const z=THREE.MathUtils.lerp(22,-14.3,THREE.MathUtils.smoothstep(p,0,1));
   const x=-.65*Math.sin(p*Math.PI*2);
   target.set(x,2.42,z);
   camera.position.lerp(target,Math.min(delta*3,1));
   camera.lookAt(x*.3,2.26,z-13);
 });
 return null;
}
export default function HouseTour(){
 const story=useRef(null),progress=useRef(0),[current,setCurrent]=useState(0);
 useEffect(()=>{
  const t=ScrollTrigger.create({trigger:story.current,start:'top top',end:'bottom bottom',onUpdate(s){progress.current=s.progress;setCurrent(Math.min(3,Math.floor(s.progress*4)));}});
  return ()=>t.kill();
 },[]);
 const jump=(i)=>{const el=story.current;if(!el)return;const range=el.offsetHeight-window.innerHeight;window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+(i/4+.025)*range,behavior:'smooth'});};
 return <section ref={story} id="visita-imersiva" className="scroll-story tour-story" aria-label="Visita virtual ilustrativa de um imóvel">
  <div className="sticky-viewport tour-viewport">
   <div className="tour-canvas-wrap" aria-hidden="true">
    <Canvas camera={{fov:62,position:[0,2.42,22],near:.1,far:130}} dpr={[1,1.65]} shadows gl={{antialias:true,alpha:false}} onCreated={({scene})=>{scene.background=new THREE.Color('#ced4cb');scene.fog=new THREE.Fog('#ced4cb',30,75);}}>
     <ambientLight intensity={1.55}/><hemisphereLight intensity={2.2} color="#dceaff" groundColor="#b4a28c"/>
     <directionalLight position={[7,16,14]} intensity={2.3} castShadow shadow-mapSize={[1024,1024]} />
     <pointLight position={[1,3.5,-6]} intensity={35} color="#ffe1b2" distance={17}/>
     <pointLight position={[0,3.5,-15]} intensity={30} color="#ffead2" distance={12}/>
     <Suspense fallback={null}><TourHouse/><CameraMove progress={progress}/></Suspense>
    </Canvas>
   </div>
   <div className="tour-shade"/>
   <div className="story-topline"><span>UMA EXPERIÊNCIA THONY OLIVEIRA</span><span>VISITA IMERSIVA · CONCEITO 3D</span></div>
   <div className="story-copy">
     <span className="eyebrow light"><span className="tiny-circle"/> EXPLORE CADA DETALHE</span>
     <h2>Entre. Sinta.<br/><em>Imagine viver.</em></h2>
     <p>Role a página para caminhar da fachada aos ambientes da casa. Volte o scroll para fazer o caminho inverso.</p>
   </div>
   <div className="tour-stage">
    <span className="stage-eyebrow">{stages[current].eyebrow}</span>
    <strong>{stages[current].name}</strong><span>{stages[current].detail}</span>
    <div className="stage-progress">{stages.map((v,i)=><button key={v.eyebrow} className={current===i?'on':''} onClick={()=>jump(i)} aria-label={'Ir para '+v.name}/>)}</div>
   </div>
   <div className="story-scroll-hint"><MoveDown size={18}/><span>ROLE PARA EXPLORAR</span></div>
   <span className="demo-tag">Ambientes 3D ilustrativos · não representam imóvel anunciado</span>
  </div>
 </section>;
}
