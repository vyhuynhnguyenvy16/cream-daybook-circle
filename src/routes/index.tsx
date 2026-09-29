import { createFileRoute } from "@tanstack/react-router";
import {
  Bell, CalendarDays, Camera, Check, ChevronLeft, ChevronRight, Clock3,
  Copy, Image as ImageIcon, Link2, MapPin, Plus, RotateCcw, Send,
  Share2, Sparkles, Users, Vote, X,
} from "lucide-react";
import { useState } from "react";

import cafePhoto from "@/assets/friends-cafe.jpg";
import riverPhoto from "@/assets/river-sunset.jpg";
import phoPhoto from "@/assets/pho-table.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hôm nay — Mật" },
      { name: "description", content: "Chia sẻ ảnh và hẹn đi chơi cùng những người bạn thân." },
      { property: "og:title", content: "Hôm nay — Mật" },
      { property: "og:description", content: "Chia sẻ ảnh và hẹn đi chơi cùng những người bạn thân." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Screen = "today" | "friends" | "camera" | "photo" | "schedule" | "poll" | "invite";

const friends = [
  { name: "Nga", initial: "N" }, { name: "Minh", initial: "M" },
  { name: "Tuấn", initial: "T" }, { name: "Lan", initial: "L" },
];

function Index() {
  const [screen, setScreen] = useState<Screen>("today");
  const [inviteAccepted, setInviteAccepted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <div className="min-h-dvh bg-background text-foreground antialiased">
      <div className="relative mx-auto flex h-dvh max-w-[430px] flex-col overflow-hidden bg-background md:my-6 md:h-[844px] md:rounded-[28px] md:border md:border-border">
        {screen === "today" && <Today onOpen={setScreen} inviteAccepted={inviteAccepted} confirmed={confirmed} onAccept={() => { setInviteAccepted(true); notify("Đã nhận lời hẹn"); }} onConfirm={() => { setConfirmed(true); notify("Lịch hẹn đã được xác nhận"); }} />}
        {screen === "friends" && <Friends onOpen={setScreen} />}
        {screen === "camera" && <CameraScreen onClose={() => setScreen("today")} onSent={() => { setScreen("today"); notify("Đã gửi ảnh!"); }} />}
        {screen === "photo" && <PhotoViewer onClose={() => setScreen("today")} onReact={() => notify("Đã thả tim")}/>} 
        {screen === "schedule" && <Schedule onClose={() => setScreen("today")} onDone={() => { setScreen("today"); notify("Đã gửi lời hẹn!"); }} onPoll={() => setScreen("poll")} />}
        {screen === "poll" && <Poll onClose={() => setScreen("today")} onDone={() => { setScreen("today"); notify("Đã chốt 19:00"); }} />}
        {screen === "invite" && <Invite onClose={() => setScreen("friends")} onCopy={() => notify("Đã sao chép link")}/>} 

        {(screen === "today" || screen === "friends") && <BottomNav screen={screen} onOpen={setScreen} />}
        {toast && <div role="status" className="absolute bottom-28 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background sheet-enter">{toast}</div>}
      </div>
    </div>
  );
}

function TopBar({ title, subtitle, onBack, action }: { title: string; subtitle?: string; onBack?: () => void; action?: React.ReactNode }) {
  return <header className="flex items-center gap-3 px-5 pb-3 pt-6">
    {onBack && <Button variant="soft" size="round" aria-label="Quay lại" onClick={onBack}><ChevronLeft /></Button>}
    <div className="min-w-0 flex-1"><p className="text-[13px] text-muted-foreground">{subtitle}</p><h1 className="text-xl font-semibold">{title}</h1></div>{action}
  </header>;
}

function Today({ onOpen, inviteAccepted, confirmed, onAccept, onConfirm }: { onOpen: (s: Screen) => void; inviteAccepted: boolean; confirmed: boolean; onAccept: () => void; onConfirm: () => void }) {
  return <>
    <header className="flex items-end justify-between px-5 pb-4 pt-7">
      <div><p className="text-[13px] text-muted-foreground">Thứ Ba · 29 tháng 9</p><h1 className="mt-1 text-[32px] font-semibold leading-none">Hôm nay</h1></div>
      <Button variant="soft" size="round" aria-label="Thông báo"><Bell /></Button>
    </header>
    <main className="flex-1 overflow-y-auto px-5 pb-32 [scrollbar-width:none]">
      {!inviteAccepted && <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 backdrop-blur-md">
        <Avatar initial="N" active />
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Nga rủ bạn đi ăn tối</p><p className="text-[13px] text-muted-foreground">Hôm nay · 19:00</p></div>
        <Button variant="app" onClick={onAccept}>Đi</Button>
      </div>}

      <button onClick={() => onOpen("schedule")} className="mt-4 w-full cursor-pointer rounded-[20px] border border-border bg-card p-4 text-left backdrop-blur-md transition-transform active:scale-[0.99]">
        <div className="flex items-center justify-between"><span className="text-[13px] text-muted-foreground">HẸN GẦN NHẤT</span><span className="rounded-full bg-primary/15 px-3 py-1 text-[13px] font-semibold text-primary">Còn 2 giờ</span></div>
        <div className="mt-4 flex gap-3"><div className="grid size-12 place-items-center rounded-full bg-primary text-xl">☕</div><div><p className="text-xl font-semibold">Cà phê với Nga</p><p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="size-4"/> Quán Mây · Quận 1</p></div></div>
        <div className="my-4 border-t-2 border-dashed border-border" />
        <div className="flex items-center justify-between"><AvatarStack/><span onClick={(e) => { e.stopPropagation(); onConfirm(); }} className={cn("rounded-full px-4 py-2 text-sm font-semibold", confirmed ? "bg-accent text-accent-foreground" : "bg-foreground text-background")}>{confirmed ? "Đã xác nhận" : "Xác nhận"}</span></div>
      </button>

      <SectionTitle title="Bạn vừa đăng" aside="3 ảnh mới" />
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {[{name:"Nga",img:cafePhoto},{name:"Minh",img:riverPhoto},{name:"Tuấn",img:phoPhoto}].map((item) => <button key={item.name} onClick={() => onOpen("photo")} className="w-28 shrink-0 text-left"><div className="rounded-2xl bg-card p-1.5"><img src={item.img} alt={`Ảnh mới của ${item.name}`} loading="lazy" width={816} height={816} className="aspect-square w-full rounded-xl object-cover" /></div><p className="mt-2 text-[13px] text-muted-foreground">{item.name}</p></button>)}
      </div>

      <SectionTitle title="Sắp tới" aside="Xem tất cả" />
      <div className="space-y-2">
        <Plan day="T5" title="Bữa tối nhóm" detail="19:00 · Nhà hàng Lá" meta="3 người" onClick={() => onOpen("poll")}/>
        <Plan day="T7" title="Đi xem phim" detail="20:30 · Cine City" meta="2 người" />
        <Plan day="CN" title="Picnic bờ sông" detail="08:00 · Công viên" meta="4 người" />
      </div>
      <Button variant="soft" size="touch" className="mt-4 w-full" onClick={() => onOpen("schedule")}><Sparkles /> Rủ nhanh hôm nay</Button>
    </main>
  </>;
}

function Friends({ onOpen }: { onOpen: (s: Screen) => void }) {
  const [tab, setTab] = useState<"friends" | "groups">("friends");
  return <><TopBar title="Bạn bè" subtitle="4 trên 20 người" action={<Button variant="app" size="round" aria-label="Mời bạn" onClick={() => onOpen("invite")}><Link2/></Button>}/>
    <main className="flex-1 overflow-y-auto px-5 pb-32 [scrollbar-width:none]">
      <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Bạn thân</h2><span className="text-[13px] text-muted-foreground">4 trên 5</span></div>
      <div className="mt-4 grid grid-cols-5 gap-2">{friends.map(f => <div key={f.name} className="text-center"><Avatar initial={f.initial} active/><p className="mt-2 truncate text-[13px]">{f.name}</p></div>)}<button className="mx-auto grid size-12 place-items-center rounded-full border-2 border-dashed border-border text-muted-foreground"><Plus/></button></div>
      <button onClick={() => onOpen("schedule")} className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-secondary p-3 text-left"><div className="grid size-10 place-items-center rounded-xl bg-background">☕</div><div className="flex-1"><p className="text-sm font-semibold">Cà phê · Nga, Minh</p><p className="text-[13px] text-muted-foreground">Hôm nay · 19:00</p></div><ChevronRight className="size-5 text-muted-foreground"/></button>
      <div className="mt-6 grid grid-cols-2 rounded-xl bg-secondary p-1"><button onClick={() => setTab("friends")} className={cn("h-10 rounded-lg text-sm font-semibold",tab === "friends" && "bg-card")}>Bạn bè</button><button onClick={() => setTab("groups")} className={cn("h-10 rounded-lg text-sm font-semibold",tab === "groups" && "bg-card")}>Nhóm</button></div>
      {tab === "friends" ? <div className="mt-3 space-y-2">{friends.map((f,i) => <div key={f.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"><Avatar initial={f.initial}/><div className="flex-1"><p className="font-semibold">{f.name}</p><p className="text-[13px] text-muted-foreground">{i === 0 ? "12 ngày liên tiếp" : "Hoạt động gần đây"}</p></div><Button variant="soft" size="icon" aria-label={`Rủ ${f.name}`} onClick={() => onOpen("schedule")}><CalendarDays/></Button></div>)}</div> : <div className="mt-3 space-y-2">{[{e:"🍜",n:"Hội ăn đêm",m:"5 thành viên"},{e:"🏕️",n:"Cuối tuần đâu?",m:"4 thành viên"},{e:"🎬",n:"Mọt phim",m:"3 thành viên"}].map(g => <button key={g.n} onClick={() => onOpen("poll")} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"><span className="grid size-12 place-items-center rounded-xl bg-secondary text-xl">{g.e}</span><div className="flex-1"><p className="font-semibold">{g.n}</p><p className="text-[13px] text-muted-foreground">{g.m}</p></div><ChevronRight className="size-5"/></button>)}</div>}
      <Button variant="ink" size="touch" className="mt-5 w-full" onClick={() => onOpen("invite")}><Share2/> Mời bạn bằng link</Button>
    </main></>;
}

function CameraScreen({ onClose, onSent }: { onClose: () => void; onSent: () => void }) {
  const [shot, setShot] = useState(false);
  return <div className="relative flex h-full flex-col overflow-hidden bg-foreground text-background sheet-enter">
    {shot ? <img src={cafePhoto} alt="Ảnh vừa chụp" width={816} height={816} className="absolute inset-0 size-full object-cover"/> : <div className="absolute inset-0 grid place-items-center bg-foreground"><div className="text-center text-background/70"><Camera className="mx-auto size-12"/><p className="mt-3 text-sm">Khung xem trước camera</p></div></div>}
    <div className="relative z-10 flex justify-between p-5"><Button variant="soft" size="round" aria-label="Đóng camera" onClick={onClose}><X/></Button><Button variant="soft" size="round" aria-label="Đổi camera"><RotateCcw/></Button></div>
    <div className="relative z-10 mt-auto bg-foreground/85 p-5 backdrop-blur-md">
      {shot && <><p className="mb-3 text-sm font-semibold">Gửi đến</p><div className="mb-5 flex gap-4"><div className="text-center"><div className="grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"><Users/></div><p className="mt-1 text-[13px]">Tất cả</p></div>{friends.slice(0,3).map(f=><div key={f.name} className="text-center"><Avatar initial={f.initial}/><p className="mt-1 text-[13px]">{f.name}</p></div>)}</div></>}
      <div className="flex items-center justify-around">{!shot && <Button variant="soft" size="round" aria-label="Thư viện"><ImageIcon/></Button>}<Button variant="app" className={cn("size-20 rounded-full border-4 border-background p-0", shot && "h-12 w-auto px-8")} onClick={() => shot ? onSent() : setShot(true)}>{shot ? <><Send/> Gửi</> : <span className="size-14 rounded-full bg-primary-foreground"/>}</Button>{!shot && <div className="size-12"/>}</div>
    </div>
  </div>;
}

function PhotoViewer({ onClose, onReact }: { onClose: () => void; onReact: () => void }) {
  const [reaction,setReaction]=useState("");
  return <div className="flex h-full flex-col p-5 sheet-enter"><div className="flex items-center justify-between"><Button variant="soft" size="round" onClick={onClose} aria-label="Đóng ảnh"><ChevronLeft/></Button><p className="text-sm font-semibold">Ảnh của Nga</p><div className="size-12"/></div><div className="my-auto rotate-[-1deg] bg-card p-3 pb-5"><img src={cafePhoto} alt="Nga và bạn bè ở quán cà phê" width={816} height={816} className="aspect-[4/5] w-full object-cover"/><div className="mt-4 flex justify-between"><div><p className="font-semibold">Nga</p><p className="text-[13px] text-muted-foreground">12 phút trước</p></div><span className="text-2xl">{reaction}</span></div></div><div className="flex justify-center gap-2 pb-4">{["❤️","😂","🥹","🔥","👏","☕"].map(e=><button key={e} aria-label={`Phản ứng ${e}`} onClick={()=>{setReaction(e);onReact();}} className={cn("grid size-12 place-items-center rounded-full bg-secondary text-xl",reaction===e&&"ring-2 ring-primary")}>{e}</button>)}</div></div>;
}

function Schedule({ onClose, onDone, onPoll }: { onClose: () => void; onDone: () => void; onPoll: () => void }) {
  const [step,setStep]=useState(1); const [selected,setSelected]=useState(["Nga"]);
  return <div className="flex h-full flex-col sheet-enter"><TopBar title="Rủ bạn đi chơi" subtitle={`${step} trên 4`} onBack={step===1?onClose:()=>setStep(step-1)}/><div className="mx-5 h-1 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary transition-all" style={{width:`${step*25}%`}}/></div><main className="flex-1 overflow-y-auto p-5">
    {step===1&&<><h2 className="text-xl font-semibold">Bạn muốn rủ ai?</h2><div className="mt-5 grid grid-cols-4 gap-4">{friends.map(f=><button key={f.name} onClick={()=>setSelected(s=>s.includes(f.name)?s.filter(x=>x!==f.name):[...s,f.name])} className="text-center"><div className={cn("mx-auto rounded-full",selected.includes(f.name)&&"ring-2 ring-primary ring-offset-4 ring-offset-background")}><Avatar initial={f.initial}/></div><p className="mt-2 text-sm">{f.name}</p></button>)}</div></>}
    {step===2&&<><h2 className="text-xl font-semibold">Khi nào mình đi?</h2><div className="mt-4 flex flex-wrap gap-2">{["Tối nay","Ngày mai","Cuối tuần"].map((x,i)=><button key={x} className={cn("rounded-full px-4 py-2 text-sm",i===0?"bg-primary text-primary-foreground":"bg-secondary")}>{x}</button>)}</div><div className="mt-5 rounded-2xl border border-border bg-card p-4"><p className="text-sm text-muted-foreground">Thứ Ba, 29/09</p><p className="mt-2 text-[32px] font-semibold">19:00</p></div><Button variant="soft" size="touch" className="mt-3 w-full"><Clock3/> Gợi ý giờ rảnh</Button><Button variant="soft" size="touch" className="mt-2 w-full" onClick={onPoll}><Vote/> Để nhóm bình chọn</Button></>}
    {step===3&&<><h2 className="text-xl font-semibold">Mình sẽ làm gì?</h2><div className="mt-5 flex gap-3">{["☕","🍜","🎬","🏕️","🎂"].map((e,i)=><button key={e} className={cn("grid size-12 place-items-center rounded-full bg-secondary text-xl",i===0&&"ring-2 ring-primary")}>{e}</button>)}</div><label className="mt-6 block text-sm font-semibold">Tên buổi hẹn</label><input defaultValue="Cà phê cuối ngày" className="mt-2 h-12 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring"/><label className="mt-4 block text-sm font-semibold">Địa điểm <span className="font-normal text-muted-foreground">(không bắt buộc)</span></label><input placeholder="Quán nào đó..." className="mt-2 h-12 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring"/></>}
    {step===4&&<><h2 className="text-xl font-semibold">Xem lại lời hẹn</h2><div className="mt-5 rounded-[20px] border border-border bg-card p-5"><div className="flex justify-between"><span className="text-[13px] text-muted-foreground">TEM HẸN</span><span className="text-primary">19:00</span></div><p className="mt-5 text-2xl font-semibold">☕ Cà phê cuối ngày</p><p className="mt-2 text-muted-foreground">Thứ Ba, 29/09 · Nga và Minh</p><div className="my-5 border-t-2 border-dashed border-border"/><AvatarStack/></div></>}
  </main><div className="border-t border-border bg-background p-5"><Button variant="app" size="touch" className="w-full" onClick={()=>step===4?onDone():setStep(step+1)}>{step===4?<><Send/> Gửi lời hẹn</>:<>Tiếp tục <ChevronRight/></>}</Button></div></div>;
}

function Poll({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [choice,setChoice]=useState(0);
  return <div className="flex h-full flex-col sheet-enter"><TopBar title="Hội ăn đêm" subtitle="🍜 5 thành viên" onBack={onClose}/><main className="flex-1 overflow-y-auto px-5"><div className="rounded-2xl bg-secondary p-4"><p className="font-semibold">Chọn giờ đi ăn lẩu</p><p className="mt-1 text-[13px] text-muted-foreground">Bạn có thể chọn nhiều phương án</p></div><SectionTitle title="3 phương án" aside="4 đã chọn"/><div className="space-y-3">{["Thứ Sáu · 19:00","Thứ Bảy · 18:30","Chủ Nhật · 18:00"].map((x,i)=><button key={x} onClick={()=>setChoice(i)} className={cn("w-full rounded-2xl border bg-card p-4 text-left",choice===i?"border-primary ring-1 ring-primary":"border-border")}><div className="flex items-center"><div className="flex-1"><p className="font-semibold">{x}</p><p className="mt-1 text-[13px] text-muted-foreground">{i===0?"4 phiếu · đang dẫn đầu":`${2-i} phiếu`}</p></div>{choice===i&&<span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-4"/></span>}</div><div className="mt-3"><AvatarStack count={i===0?4:2}/></div></button>)}</div><Button variant="soft" size="touch" className="mt-4 w-full"><Bell/> Nhắc bạn chưa chọn</Button></main><div className="border-t border-border bg-background p-5"><Button variant="app" size="touch" className="w-full" onClick={onDone}><Check/> Chốt phương án này</Button></div></div>;
}

function Invite({ onClose, onCopy }: { onClose: () => void; onCopy: () => void }) { return <div className="flex h-full flex-col sheet-enter"><TopBar title="Mời bạn" subtitle="Kết bạn qua link" onBack={onClose}/><main className="flex flex-1 flex-col items-center justify-center px-6 text-center"><div className="grid size-24 place-items-center rounded-full bg-secondary"><Link2 className="size-10 text-primary"/></div><h2 className="mt-6 text-2xl font-semibold">Thêm bạn vào Mật</h2><p className="mt-3 max-w-xs text-muted-foreground">Gửi link này cho người bạn muốn chia sẻ ảnh và những cuộc hẹn.</p><div className="mt-6 flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2 pl-4"><span className="min-w-0 flex-1 truncate text-left text-sm">mat.app/moi/mai-29</span><Button variant="soft" size="round" aria-label="Sao chép" onClick={onCopy}><Copy/></Button></div></main><div className="p-5"><Button variant="app" size="touch" className="w-full"><Share2/> Chia sẻ link mời</Button><p className="mt-3 text-center text-[13px] text-muted-foreground">4 trên 20 bạn</p></div></div>; }

function BottomNav({ screen, onOpen }: { screen: Screen; onOpen: (s: Screen) => void }) { return <nav className="absolute inset-x-0 bottom-0 z-30 px-5 pb-5"><div className="relative flex h-16 items-center justify-between rounded-[20px] border border-border bg-card px-8 backdrop-blur-xl"><button onClick={()=>onOpen("today")} className={cn("flex h-12 flex-col items-center justify-center gap-1 text-[11px]",screen==="today"?"text-primary":"text-muted-foreground")}><CalendarDays className="size-5"/>Hôm nay</button><Button variant="app" className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-background p-0" onClick={()=>onOpen("camera")} aria-label="Mở camera"><Camera className="size-6"/></Button><button onClick={()=>onOpen("friends")} className={cn("flex h-12 flex-col items-center justify-center gap-1 text-[11px]",screen==="friends"?"text-primary":"text-muted-foreground")}><Users className="size-5"/>Bạn bè</button></div></nav>; }
function Avatar({ initial, active=false }: { initial: string; active?: boolean }) { return <span className={cn("grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-sm font-semibold",active&&"ring-2 ring-primary ring-offset-2 ring-offset-background")}>{initial}</span>; }
function AvatarStack({ count=3 }: { count?: number }) { return <div className="flex -space-x-2">{friends.slice(0,count).map(f=><span key={f.name} className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold ring-2 ring-card">{f.initial}</span>)}</div>; }
function SectionTitle({ title, aside }: { title: string; aside: string }) { return <div className="mb-3 mt-6 flex items-center justify-between"><h2 className="font-semibold">{title}</h2><span className="text-[13px] text-muted-foreground">{aside}</span></div>; }
function Plan({day,title,detail,meta,onClick}:{day:string;title:string;detail:string;meta:string;onClick?:()=>void}) { return <button onClick={onClick} className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"><span className="grid size-11 place-items-center rounded-xl bg-secondary text-[13px] font-semibold">{day}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{title}</span><span className="block truncate text-[13px] text-muted-foreground">{detail}</span></span><span className="text-[13px] text-muted-foreground">{meta}</span></button>; }