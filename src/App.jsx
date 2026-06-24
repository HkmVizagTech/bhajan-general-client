import React, { useState, useEffect, useRef } from "react";
import {
  Music2, MapPin, CalendarDays, UtensilsCrossed, Ticket, ShieldCheck,
  Phone, User, ArrowRight, ArrowLeft, X, Check, Loader2, Sparkles,
  Clock, Users,
} from "lucide-react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

.bc-root{
  --bg:#120A2E;--bg2:#170E3A;--surface:#1F1450;--surface2:#2A1C66;
  --line:rgba(190,170,255,.14);--gold:#FFB12E;--gold2:#FFD884;--amber:#FF8A1E;
  --yellow:#FFE23A;--violet:#9D7BFF;--violet2:#C5AFFF;
  --text:#F5F2FF;--muted:#B6ABE2;--muted2:#7A6DA8;
  font-family:'Plus Jakarta Sans',system-ui,sans-serif;
  color:var(--text);background:var(--bg);min-height:100vh;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;padding-bottom:84px;
}
.bc-root *{box-sizing:border-box;}
.bc-root::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(900px 560px at 50% -8%,rgba(255,177,46,.16),transparent 60%),
    radial-gradient(760px 520px at 6% 22%,rgba(110,70,230,.26),transparent 60%),
    radial-gradient(820px 620px at 95% 34%,rgba(157,123,255,.12),transparent 60%);}
.bc-wrap{position:relative;z-index:1;max-width:1140px;margin:0 auto;padding:0 22px;}
.bc-nav{display:flex;align-items:center;justify-content:space-between;padding:20px 0;}
.bc-brand{display:flex;align-items:center;gap:11px;font-weight:700;}
.bc-brand-badge{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;
  background:linear-gradient(135deg,var(--gold),var(--amber));color:#241200;}
.bc-brand small{display:block;font-size:10.5px;font-weight:500;color:var(--muted);}
.bc-navcta{cursor:pointer;border:none;font-family:'Plus Jakarta Sans';font-weight:700;font-size:14px;
  color:#241200;background:linear-gradient(135deg,var(--gold),var(--gold2));padding:11px 19px;
  border-radius:999px;transition:transform .15s;}
.bc-navcta:hover:not(:disabled){transform:translateY(-1px);}
.bc-navcta:disabled{opacity:.5;cursor:not-allowed;}
.bc-marquee{position:relative;z-index:1;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  overflow:hidden;background:rgba(255,177,46,.05);padding:9px 0;}
.bc-marquee-track{display:inline-flex;white-space:nowrap;font-family:'Space Mono',monospace;font-size:12.5px;
  letter-spacing:.22em;color:var(--gold2);animation:bc-scroll 22s linear infinite;}
@keyframes bc-scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.bc-hero{display:flex;flex-direction:column;align-items:center;text-align:center;padding:54px 0 34px;}
.bc-eyebrow{font-family:'Space Mono',monospace;font-size:13px;letter-spacing:.34em;text-transform:uppercase;
  color:var(--yellow);margin-bottom:18px;}
.bc-title{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;line-height:.9;
  font-size:clamp(54px,9.5vw,110px);letter-spacing:-.03em;margin:0;text-transform:uppercase;color:#fff;
  text-shadow:0 0 54px rgba(255,177,46,.4);}
.bc-band{margin:22px 0 0;font-family:'Bricolage Grotesque';font-weight:700;font-size:22px;}
.bc-band .by{color:var(--muted);font-weight:500;font-size:15px;font-family:'Plus Jakarta Sans';}
.bc-tag{color:var(--gold2);font-weight:700;font-size:17px;margin-top:7px;}
.bc-meta{display:flex;flex-wrap:wrap;gap:9px;margin:28px 0 4px;justify-content:center;}
.bc-chip{display:inline-flex;align-items:center;gap:8px;padding:9px 14px;border-radius:999px;
  background:var(--surface);border:1px solid var(--line);font-size:13.5px;}
.bc-chip svg{color:var(--gold2);}
.bc-herorow{display:flex;align-items:center;gap:18px;margin-top:28px;flex-wrap:wrap;justify-content:center;}
.bc-herocta{display:inline-flex;align-items:center;gap:10px;cursor:pointer;border:none;
  font-family:'Plus Jakarta Sans';font-weight:700;font-size:16px;color:#241200;padding:17px 32px;
  border-radius:999px;background:linear-gradient(135deg,var(--gold),var(--gold2));
  box-shadow:0 16px 50px -14px rgba(255,177,46,.75);transition:transform .15s;}
.bc-herocta:hover:not(:disabled){transform:translateY(-2px);}
.bc-herocta:disabled{opacity:.5;cursor:not-allowed;}
.bc-from{font-size:13px;color:var(--muted);}
.bc-from b{display:block;font-family:'Bricolage Grotesque';font-size:24px;color:#fff;font-weight:700;}
.bc-cap{width:100%;max-width:420px;margin:18px auto 0;}
.bc-cap-label{display:flex;justify-content:space-between;font-size:12.5px;color:var(--muted);margin-bottom:7px;}
.bc-cap-bar{height:6px;border-radius:999px;background:var(--surface2);overflow:hidden;}
.bc-cap-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--gold),var(--amber));transition:width .6s;}
.bc-sec{padding:42px 0 4px;}
.bc-sectitle{font-family:'Bricolage Grotesque';font-weight:700;font-size:clamp(24px,4vw,32px);margin:0 0 16px;}
.bc-about{color:var(--muted);font-size:16px;line-height:1.75;max-width:760px;}
.bc-about b{color:var(--text);font-weight:600;}
.bc-ticket-wrap{display:flex;justify-content:center;margin-top:10px;}
.bc-stub{position:relative;border-radius:20px;padding:34px;background:var(--surface);
  border:1.5px solid rgba(255,177,46,.36);overflow:hidden;width:100%;max-width:480px;transition:transform .2s;}
.bc-stub:hover{transform:translateY(-4px);}
.bc-stub::before,.bc-stub::after{content:"";position:absolute;width:26px;height:26px;border-radius:50%;
  background:var(--bg);top:50%;transform:translateY(-50%);}
.bc-stub::before{left:-13px;}.bc-stub::after{right:-13px;}
.bc-stub-glow{position:absolute;inset:0;pointer-events:none;
  background:radial-gradient(300px 160px at 80% 0%,rgba(255,177,46,.2),transparent 70%);}
.bc-stub-tag{position:relative;display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;
  letter-spacing:.05em;text-transform:uppercase;padding:6px 11px;border-radius:999px;
  background:rgba(255,177,46,.15);color:var(--gold2);}
.bc-stub-name{position:relative;font-family:'Bricolage Grotesque';font-weight:700;font-size:28px;margin:16px 0 4px;}
.bc-stub-desc{position:relative;color:var(--muted);font-size:14.5px;line-height:1.6;}
.bc-tear{position:relative;border-top:1.5px dashed rgba(190,170,255,.2);margin:24px 0;}
.bc-price{position:relative;display:flex;align-items:flex-end;gap:6px;}
.bc-price .cur{font-size:22px;font-weight:700;color:var(--muted);margin-bottom:7px;}
.bc-price .amt{font-family:'Bricolage Grotesque';font-weight:800;font-size:58px;line-height:1;color:var(--gold2);}
.bc-price .per{font-size:13px;color:var(--muted);margin-bottom:9px;}
.bc-stub-feat{position:relative;list-style:none;padding:0;margin:18px 0 24px;display:grid;gap:11px;}
.bc-stub-feat li{display:flex;gap:10px;align-items:flex-start;font-size:14px;}
.bc-stub-feat svg{flex:none;margin-top:2px;color:var(--gold2);}
.bc-stubcta{position:relative;width:100%;cursor:pointer;border:none;font-family:'Plus Jakarta Sans';
  font-weight:700;font-size:16px;padding:16px;border-radius:12px;display:flex;align-items:center;
  justify-content:center;gap:9px;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#241200;}
.bc-stubcta:hover:not(:disabled){filter:brightness(1.04);}
.bc-stubcta:disabled{opacity:.5;cursor:not-allowed;}
.bc-soldout{position:relative;text-align:center;padding:22px;background:rgba(255,92,122,.08);
  border:1.5px solid rgba(255,92,122,.25);border-radius:12px;color:#FF8A8A;font-weight:600;}
.bc-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;background:rgba(18,10,46,.93);
  backdrop-filter:blur(12px);border-top:1px solid var(--line);padding:14px 22px;}
.bc-bar-in{max-width:1140px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;}
.bc-bar .lbl{font-size:12px;color:var(--muted);}
.bc-bar .lbl b{display:block;font-family:'Bricolage Grotesque';font-size:22px;color:#fff;font-weight:700;}
.bc-bar button{cursor:pointer;border:none;font-family:'Plus Jakarta Sans';font-weight:700;font-size:15px;
  color:#241200;background:linear-gradient(135deg,var(--gold),var(--gold2));padding:14px 28px;border-radius:12px;
  display:flex;align-items:center;gap:8px;}
.bc-overlay{position:fixed;inset:0;z-index:60;background:rgba(10,5,28,.76);backdrop-filter:blur(8px);
  display:flex;align-items:flex-start;justify-content:center;padding:34px 18px;overflow-y:auto;}
.bc-modal{width:100%;max-width:520px;background:var(--bg2);border:1px solid var(--line);
  border-radius:22px;overflow:hidden;box-shadow:0 40px 100px -30px rgba(0,0,0,.85);}
.bc-mhead{padding:20px 26px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--line);background:var(--surface);}
.bc-mhead .tt{display:flex;align-items:center;gap:11px;}
.bc-mhead .pill{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;
  padding:5px 10px;border-radius:999px;background:rgba(255,177,46,.16);color:var(--gold2);}
.bc-mhead h3{margin:0;font-family:'Bricolage Grotesque';font-weight:700;font-size:19px;}
.bc-close{cursor:pointer;background:var(--surface2);border:none;color:var(--muted);
  width:34px;height:34px;border-radius:10px;display:grid;place-items:center;}
.bc-steps{display:flex;gap:8px;padding:18px 26px 0;}
.bc-steps .s{flex:1;height:4px;border-radius:999px;background:var(--surface2);}
.bc-steps .s.on{background:linear-gradient(90deg,var(--gold),var(--violet));}
.bc-mbody{padding:22px 26px 28px;}
.bc-field{margin-bottom:15px;}
.bc-field label{display:block;font-size:12.5px;font-weight:600;color:var(--muted);margin-bottom:7px;}
.bc-input{width:100%;background:var(--surface);border:1px solid var(--line);border-radius:11px;
  padding:13px 14px;color:var(--text);font-family:'Plus Jakarta Sans';font-size:14.5px;outline:none;transition:border-color .15s;}
.bc-input::placeholder{color:var(--muted2);}
.bc-input:focus{border-color:var(--gold);}
.bc-inwrap{position:relative;}
.bc-inwrap svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--muted2);}
.bc-inwrap .bc-input{padding-left:40px;}
.bc-btn{width:100%;cursor:pointer;border:none;font-family:'Plus Jakarta Sans';font-weight:700;
  font-size:15px;padding:15px;border-radius:12px;color:#241200;display:flex;align-items:center;
  justify-content:center;gap:8px;background:linear-gradient(135deg,var(--gold),var(--gold2));
  transition:transform .15s;text-decoration:none;}
.bc-btn:hover:not(:disabled){transform:translateY(-1px);}
.bc-btn:disabled{opacity:.45;cursor:not-allowed;}
.bc-btn.ghost{background:var(--surface2);color:var(--text);}
.bc-summary{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px;margin-bottom:18px;}
.bc-srow{display:flex;justify-content:space-between;align-items:center;font-size:14px;padding:7px 0;color:var(--muted);}
.bc-srow.tot{border-top:1px dashed rgba(190,170,255,.18);margin-top:6px;padding-top:13px;
  color:var(--text);font-weight:700;font-size:17px;}
.bc-srow .amt{font-family:'Space Mono',monospace;}
.bc-secure{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:14px;font-size:12px;color:var(--muted2);}
.bc-pay-err{background:rgba(255,92,122,.12);border:1px solid rgba(255,92,122,.3);color:#ffb3c1;
  border-radius:10px;padding:10px 13px;font-size:13px;margin-bottom:14px;text-align:center;}
.bc-success{text-align:center;padding:8px 4px 4px;}
.bc-succ-ic{width:74px;height:74px;border-radius:50%;display:grid;place-items:center;margin:6px auto 18px;
  background:rgba(255,177,46,.15);color:var(--gold2);}
@keyframes bc-pop{from{transform:scale(.3);opacity:0;}to{transform:scale(1);opacity:1;}}
.bc-success h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:23px;margin:0 0 6px;}
.bc-succ-sub{color:var(--muted);font-size:14.5px;margin:0 0 20px;}
.bc-succ-sub b{color:var(--gold2);}
.bc-timeline{text-align:left;margin:6px 0 16px;display:grid;gap:0;}
.bc-tl-item{display:flex;gap:13px;position:relative;padding-bottom:18px;}
.bc-tl-item:last-child{padding-bottom:4px;}
.bc-tl-item::before{content:"";position:absolute;left:11px;top:24px;bottom:-2px;width:1.5px;background:rgba(190,170,255,.16);}
.bc-tl-item:last-child::before{display:none;}
.bc-tl-dot{width:23px;height:23px;border-radius:50%;flex:none;display:grid;place-items:center;
  background:var(--surface2);color:var(--muted2);border:1px solid var(--line);z-index:1;}
.bc-tl-item.done .bc-tl-dot{background:rgba(255,177,46,.2);color:var(--gold2);border-color:rgba(255,177,46,.4);}
.bc-tl-item b{display:block;font-size:13.5px;font-weight:600;}
.bc-tl-item span{display:block;font-size:12px;color:var(--muted2);margin-top:1px;line-height:1.5;}
.bc-tl-item.done b{color:var(--gold2);}
.bc-succ-actions{display:grid;gap:9px;margin-top:18px;}
.bc-ref{font-family:'Space Mono',monospace;font-size:12px;color:var(--muted2);margin-top:10px;}
.bc-foot{border-top:1px solid var(--line);margin-top:48px;padding:30px 0;display:flex;flex-wrap:wrap;
  gap:12px;align-items:center;justify-content:space-between;color:var(--muted);font-size:13px;}
.bc-foot .org{color:var(--text);font-weight:600;}
@media(max-width:600px){.bc-wrap{padding:0 16px;}.bc-stub{padding:24px;}}
`;

const API = import.meta.env.VITE_API_URL || "";
const genRef = () => "BC27-" + Math.random().toString(36).slice(2, 7).toUpperCase();
const gcalLink = (ref) =>
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Bhajan Clubbing — KirtanX Music Band") +
  "&dates=20260627T180000/20260627T220000&ctz=Asia/Kolkata" +
  "&location=" + encodeURIComponent("Vizag Conventions, Visakhapatnam") +
  "&details=" + encodeURIComponent("Music. Mantra. Bliss. Reference: " + ref);

function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const utm = { utm_source: p.get("utm_source")||"", utm_medium: p.get("utm_medium")||"",
      utm_campaign: p.get("utm_campaign")||"", utm_content: p.get("utm_content")||"" };
    if (utm.utm_source) sessionStorage.setItem("bc_utm", JSON.stringify(utm));
  } catch {}
}
function getUtm() { try { return JSON.parse(sessionStorage.getItem("bc_utm")||"{}"); } catch { return {}; } }
function fbqTrack(event, params={}, opts={}) { try { if(window.fbq) window.fbq("track",event,params,opts); } catch {} }

export default function GeneralSite() {
  const [open,setOpen]         = useState(false);
  const [step,setStep]         = useState("details");
  const [form,setForm]         = useState({name:"",phone:"",gender:""});
  const [paying,setPaying]     = useState(false);
  const [payErr,setPayErr]     = useState("");
  const [ref,setRef]           = useState("");
  const [price,setPrice]       = useState(300);
  const [soldOut,setSoldOut]   = useState(false);
  const [soldCount,setSoldCount] = useState(0);
  const [capacity,setCapacity] = useState(300);
  const [orderReady,setOrderReady] = useState(null);
  const [prepping,setPrepping] = useState(false);
  const [metaEventId,setMetaEventId] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    captureUtm();
    if (!document.querySelector('script[src*="razorpay"]')) {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.async = true;
      document.body.appendChild(s);
    }
    if (!API) return;
    fetch(`${API}/api/public/event`).then(r=>r.json()).then(d => {
      if (d?.prices?.general) setPrice(d.prices.general);
      if (d?.generalSoldOut)  setSoldOut(true);
      if (d?.generalSold!=null) setSoldCount(d.generalSold);
      if (d?.generalCapacity)   setCapacity(d.generalCapacity);
    }).catch(()=>{});
  }, []);

  const openModal = () => {
    if (soldOut) return;
    setOpen(true); setStep("details");
    setForm({name:"",phone:"",gender:""});
    setPayErr(""); setRef(""); setOrderReady(null); setPrepping(false);
    try { const eid=crypto.randomUUID(); setMetaEventId(eid); fbqTrack("Lead",{},{eventID:eid+"_lead"}); } catch {}
  };
  const closeModal = () => setOpen(false);
  const setF = k => e => setForm(s=>({...s,[k]:e.target.value}));
  const setPhone = e => setForm(s=>({...s,phone:e.target.value.replace(/\D/g,"").slice(0,10)}));
  const valid = () => form.name.trim() && form.phone.length===10 && form.gender;

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if(e.key==="Escape") closeModal(); };
    document.addEventListener("keydown",onKey);
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    return () => { document.removeEventListener("keydown",onKey); document.body.style.overflow=""; };
  }, [open]);

  const prepareOrder = async () => {
    if (!API||prepping||orderReady) return;
    setPrepping(true); setPayErr("");
    try {
      const fd = new FormData();
      fd.append("name",form.name); fd.append("phone",form.phone);
      fd.append("ticketType","general"); fd.append("gender",form.gender);
      fd.append("metaEventId",metaEventId);
      const utm=getUtm(); Object.entries(utm).forEach(([k,v])=>{if(v)fd.append(k,v);});
      const res=await fetch(`${API}/api/public/register`,{method:"POST",body:fd});
      const data=await res.json();
      if (res.ok) setOrderReady(data);
      else setPayErr(data.error||"Registration failed. Please try again.");
    } catch(e){setPayErr(e.message);}
    finally{setPrepping(false);}
  };

  const loadRazorpay = () => new Promise((resolve,reject) => {
    if (window.Razorpay) return resolve();
    let tries=0;
    const poll=setInterval(()=>{
      tries++;
      if (window.Razorpay){clearInterval(poll);resolve();}
      else if(tries>50){clearInterval(poll);reject(new Error("Payment window failed to load."));}
    },100);
  });

  const pay = async () => {
    setPayErr("");
    if (!API){setPaying(true);setTimeout(()=>{setPaying(false);setRef(genRef());setStep("success");},1400);return;}
    setPaying(true);
    try {
      let data=orderReady;
      if (!data){
        if (prepping){
          data=await new Promise((resolve,reject)=>{
            let t=0;
            const iv=setInterval(()=>{
              if(orderReady){clearInterval(iv);resolve(orderReady);return;}
              if(!prepping){clearInterval(iv);reject(new Error("Registration failed."));return;}
              if(++t>80){clearInterval(iv);reject(new Error("Taking too long."));}
            },250);
          });
        }else{await prepareOrder();data=orderReady;}
      }
      if (!data) throw new Error("Registration failed. Please try again.");
      await loadRazorpay();
      const rzp=new window.Razorpay({
        key:data.keyId,order_id:data.orderId,amount:data.amount,currency:data.currency,
        name:"Bhajan Clubbing",description:"General Pass",
        prefill:{name:form.name,contact:"91"+form.phone},
        theme:{color:"#FFB12E"},
        handler:()=>{
          setRef(String(data.registrationId).slice(-6).toUpperCase());
          setStep("success");setPaying(false);
          fbqTrack("CompleteRegistration",{currency:"INR",value:price},{eventID:metaEventId});
        },
        modal:{ondismiss:()=>setPaying(false)},
      });
      rzp.on("payment.failed",()=>{setPayErr("Payment failed. Please try again.");setPaying(false);});
      rzp.open();
    } catch(e){setPayErr(e.message||"Something went wrong.");setPaying(false);}
  };

  const capPct=Math.min(100,Math.round((soldCount/capacity)*100));
  const remaining=capacity-soldCount;
  const marquee="KIRTANX · MUSIC · MANTRA · BLISS · HARE KRISHNA · BHAJAN CLUBBING · ";

  return (
    <div className="bc-root">
      <style>{STYLES}</style>
      <div className="bc-wrap">
        <nav className="bc-nav">
          <div className="bc-brand">
            <div className="bc-brand-badge"><Music2 size={19}/></div>
            <div>Hare Krishna Vaikuntham<small>Srila Prabhupada's ISKCON · Gambheeram</small></div>
          </div>
          <button className="bc-navcta" onClick={()=>document.getElementById("bc-ticket")?.scrollIntoView({behavior:"smooth"})} disabled={soldOut}>
            {soldOut?"Sold out":"Register now"}
          </button>
        </nav>
      </div>

      <div className="bc-marquee" aria-hidden="true">
        <div className="bc-marquee-track">
          <span>{marquee}{marquee}{marquee}</span><span>{marquee}{marquee}{marquee}</span>
        </div>
      </div>

      <div className="bc-wrap">
        <header className="bc-hero">
          <div className="bc-eyebrow">Vizag's Biggest</div>
          <h1 className="bc-title">Bhajan<br/>Clubbing</h1>
          <div className="bc-band">by KirtanX <span className="by">Music Band</span></div>
          <div className="bc-tag">Music. Mantra. Bliss.</div>
          <div className="bc-meta">
            <span className="bc-chip"><CalendarDays size={15}/>Sat, 27 June · 6:00 PM</span>
            <span className="bc-chip"><MapPin size={15}/>Vizag Conventions</span>
            <span className="bc-chip"><UtensilsCrossed size={15}/>Dinner prasadam</span>
            
          </div>
          <div className="bc-herorow">
            <button className="bc-herocta" onClick={openModal} disabled={soldOut}>
              {soldOut?"Sold out":<>Book your pass <ArrowRight size={18}/></>}
            </button>
            <div className="bc-from">Only <b>₹{price}</b></div>
          </div>

        </header>

        <section className="bc-sec">
          <h2 className="bc-sectitle" style={{fontFamily:"'Bricolage Grotesque'",fontWeight:700,fontSize:"clamp(24px,4vw,32px)",margin:"0 0 16px"}}>About the night</h2>
          <p style={{color:"var(--muted)",fontSize:16,lineHeight:1.75,maxWidth:760}}>
            Hare Krishna Vaikuntham Cultural Centre invites everyone to <b style={{color:"var(--text)"}}>Vizag's biggest Bhajan Clubbing</b> — an electric evening of live kirtan and devotional music led by <b style={{color:"var(--text)"}}>KirtanX Music Band</b>. Soul-stirring bhajans, collective chanting of the holy names, and a night of music, mantra and bliss — followed by <b style={{color:"var(--text)"}}>dinner prasadam</b> for every registered guest.
          </p>
        </section>

        <section className="bc-sec" id="bc-ticket">
          <h2 style={{fontFamily:"'Bricolage Grotesque'",fontWeight:700,fontSize:"clamp(24px,4vw,32px)",margin:"0 0 16px"}}>Get your pass</h2>
          <div className="bc-ticket-wrap">
            <div className="bc-stub">
              <div className="bc-stub-glow"/>
              <span className="bc-stub-tag"><Ticket size={13}/>General Pass</span>
              <div className="bc-stub-name">General Pass</div>
              <div className="bc-stub-desc">Register, pay, and your QR pass arrives on WhatsApp before the event.</div>
              <div className="bc-tear"/>
              <div className="bc-price"><span className="cur">₹</span><span className="amt">{price}</span><span className="per">/ person</span></div>
              <ul className="bc-stub-feat">
                <li><Check size={16}/>Full kirtan night with KirtanX Music Band</li>
                <li><Check size={16}/>Dinner prasadam included</li>
                <li><Check size={16}/>QR pass sent on WhatsApp before the event</li>
                
              </ul>
              {soldOut
                ?<div className="bc-soldout">🎟️ All {capacity} passes are sold out. Thank you!</div>
                :<button className="bc-stubcta" onClick={openModal}>Get General Pass <ArrowRight size={17}/></button>}
            </div>
          </div>
        </section>

        <footer className="bc-foot">
          <div><span className="bc-foot org">Srila Prabhupada's ISKCON Gambheeram</span> · Visakhapatnam</div>
          <div>Bhajan Clubbing · 27 June</div>
        </footer>
      </div>

      {!soldOut&&(
        <div className="bc-bar">
          <div className="bc-bar-in">
            <div className="lbl">General Pass · 27 June<b>₹{price}</b></div>
            <button onClick={openModal}><Sparkles size={17}/>Book now</button>
          </div>
        </div>
      )}

      {open&&(
        <div className="bc-overlay" onClick={e=>e.target===e.currentTarget&&closeModal()}>
          <div className="bc-modal" role="dialog" aria-modal="true">
            <div className="bc-mhead">
              <div className="tt"><span className="pill">General Pass</span><h3>{step==="success"?"All set!":"Register"}</h3></div>
              <button className="bc-close" onClick={closeModal}><X size={18}/></button>
            </div>
            {step!=="success"&&(
              <div className="bc-steps">
                <div className={`s ${step==="details"||step==="payment"?"on":""}`}/>
                <div className={`s ${step==="payment"?"on":""}`}/>
              </div>
            )}
            <div className="bc-mbody">
              {step==="details"&&(
                <>
                  <div className="bc-field"><label>Full name</label>
                    <div className="bc-inwrap"><User size={16}/><input ref={nameRef} className="bc-input" placeholder="Your name" value={form.name} onChange={setF("name")}/></div></div>
                  <div className="bc-field"><label>WhatsApp number</label>
                    <div className="bc-inwrap"><Phone size={16}/><input className="bc-input" placeholder="10-digit mobile number" value={form.phone} onChange={setPhone} inputMode="numeric"/></div></div>
                  <div className="bc-field"><label>Gender</label>
                    <div style={{display:"flex",gap:8}}>
                      {["Male","Female"].map(g=>(
                        <button key={g} type="button" onClick={()=>setForm(f=>({...f,gender:g}))}
                          style={{flex:1,padding:"11px 6px",borderRadius:10,border:"1px solid",
                            borderColor:form.gender===g?"var(--gold)":"var(--line)",
                            background:form.gender===g?"rgba(255,177,46,.15)":"var(--surface)",
                            color:form.gender===g?"var(--gold2)":"var(--muted)",
                            fontFamily:"inherit",fontWeight:600,fontSize:13,cursor:"pointer"}}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <button className="bc-btn" disabled={!valid()} onClick={()=>{setStep("payment");prepareOrder();}}>
                    Continue to payment <ArrowRight size={17}/>
                  </button>
                </>
              )}
              {step==="payment"&&(
                <>
                  <div className="bc-summary">
                    <div className="bc-srow"><span>General Pass</span><span className="amt">₹{price}</span></div>
                    <div className="bc-srow"><span>Name</span><span>{form.name}</span></div>
                    <div className="bc-srow"><span>WhatsApp</span><span>{form.phone}</span></div>
                    <div className="bc-srow tot"><span>Total</span><span className="amt">₹{price}</span></div>
                  </div>
                  {payErr&&<div className="bc-pay-err">{payErr}</div>}
                  <button className="bc-btn" onClick={pay} disabled={paying}>
                    {paying?<><Loader2 size={18} style={{animation:"spin 1s linear infinite"}}/>Processing…</>:<>Pay ₹{price} securely <ArrowRight size={17}/></>}
                  </button>
                  <button className="bc-btn ghost" style={{marginTop:10}} onClick={()=>setStep("details")} disabled={paying}><ArrowLeft size={16}/>Back</button>
                  <div className="bc-secure"><ShieldCheck size={13}/>Payments secured by Razorpay</div>
                </>
              )}
              {step==="success"&&(
                <div className="bc-success">
                  <div className="bc-succ-ic" style={{animation:"bc-pop .45s cubic-bezier(.2,1.6,.4,1) both"}}><Check size={36} strokeWidth={3}/></div>
                  <h3>Hare Krishna, {form.name.split(" ")[0]}! 🙏</h3>
                  <p className="bc-succ-sub">Your payment of <b>₹{price}</b> is received.</p>
                  <div className="bc-timeline">
                    <div className="bc-tl-item done">
                      <div className="bc-tl-dot"><Check size={11} strokeWidth={3}/></div>
                      <div><b>Payment received</b><span>Just now</span></div>
                    </div>
                    <div className="bc-tl-item">
                      <div className="bc-tl-dot"><Ticket size={11}/></div>
                      <div><b>QR pass on WhatsApp</b><span>Sent to {form.phone} before the event</span></div>
                    </div>
                    <div className="bc-tl-item">
                      <div className="bc-tl-dot"><Music2 size={11}/></div>
                      <div><b>27 June · 6 PM</b><span>Show your QR at the gate. Dinner prasadam included!</span></div>
                    </div>
                  </div>
                  <div className="bc-ref">Reference {ref}</div>
                  <div className="bc-succ-actions">
                    <a className="bc-btn" href={gcalLink(ref)} target="_blank" rel="noopener noreferrer"><CalendarDays size={16}/>Add to calendar</a>
                    <button className="bc-btn ghost" onClick={closeModal}>Done</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
