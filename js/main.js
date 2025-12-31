
// Scroll animation
const obs = new IntersectionObserver(entries=>{
 entries.forEach(e=>e.isIntersecting && e.target.classList.add("show"))
},{threshold:0.15});
document.querySelectorAll(".card").forEach(c=>obs.observe(c));

// Dark / Light toggle
document.getElementById("toggle").onclick=()=>{
 document.body.classList.toggle("light");
};
