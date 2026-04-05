/* ── Feather icons ── */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof feather !== 'undefined') feather.replace();
});

/* ── Scroll reveal ── */
const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('in'), i * 55);
            obs.unobserve(e.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* Stagger grid children */
['cap-grid', 'prod-grid', 'price-grid', 'trust-grid'].forEach(cls => {
    document.querySelectorAll('.' + cls + ' .reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 0.07) + 's';
    });
});

/* ── Nav scroll shadow ── */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', scrollY > 20);
}, { passive: true });

/* ── Floating blobs ── */
let t = 0;
const blobs = document.querySelectorAll('.hero-blob');
setInterval(() => {
    t += 0.008;
    if (blobs[0]) blobs[0].style.transform = `translateY(${Math.sin(t) * 14}px) translateX(${Math.cos(t * .7) * 10}px)`;
    if (blobs[1]) blobs[1].style.transform = `translateY(${Math.cos(t) * 12}px) translateX(${Math.sin(t * .8) * 8}px)`;
    if (blobs[2]) blobs[2].style.transform = `translateY(${Math.sin(t * 1.3) * 8}px) translateX(${Math.cos(t * 1.1) * 6}px)`;
}, 30);

/* ── Char counter ── */
const desc = document.getElementById('f-desc');
if (desc) desc.addEventListener('input', () => {
    document.getElementById('char-count').textContent = desc.value.length + ' / 1000 characters';
});

/* ── Form submit ── */
function submitForm() {
    const n = document.getElementById('f-name').value.trim();
    const e = document.getElementById('f-email').value.trim();
    const ty = document.getElementById('f-type').value;
    const d = document.getElementById('f-desc').value.trim();
    if (!n || !e || !ty || !d) { alert('Please fill in all required fields (marked with *).'); return; }
    document.getElementById('idea-form').style.display = 'none';
    document.getElementById('success-msg').classList.add('show');
}

/* ── Product tab filter ── */
function filterProds(status, btn) {
    document.querySelectorAll('.prod-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.prod-card').forEach(card => {
        const s = card.dataset.status;
        const show = status === 'all' || s === status || (status === 'soon' && s === 'idea');
        card.style.display = show ? '' : 'none';
    });
}

/* ── Pricing billing toggle ── */
function toggleBilling(mode) {
    const btnO = document.getElementById('tog-once');
    const btnM = document.getElementById('tog-monthly');
    const amt = document.getElementById('p1-amt');
    const d = document.getElementById('p1-desc');
    if (mode === 'once') {
        btnO.classList.add('active'); btnM.classList.remove('active');
        amt.innerHTML = '$499<sub>one-time</sub>';
        d.textContent = 'For individuals and small businesses needing a clean, focused landing page or promotional micro-site to establish their online presence.';
    } else {
        btnM.classList.add('active'); btnO.classList.remove('active');
        amt.innerHTML = '$149<sub>/month</sub>';
        d.textContent = 'Ongoing hosting, maintenance, content updates, and priority support for your landing page — fully managed by us each month.';
    }
}