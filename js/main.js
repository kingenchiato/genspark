(function () {
    'use strict';

    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    }

    function initFAQ() {
        var items = document.querySelectorAll('.faq-item');
        items.forEach(function (item) {
            var q = item.querySelector('.faq-question');
            if (!q) return;
            q.addEventListener('click', function () {
                var open = item.classList.contains('active');
                items.forEach(function (i) { i.classList.remove('active'); });
                if (!open) item.classList.add('active');
            });
        });
    }

    function initSmoothScroll() {
        var offset = 72;
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;
                var id = href.slice(1);
                var el = document.getElementById(id);
                if (!el) return;
                e.preventDefault();
                var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            });
        });
    }

    function initScrollIndicator() {
        var indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;
        window.addEventListener('scroll', function () {
            indicator.style.opacity = window.pageYOffset > 200 ? '0' : '1';
        }, { passive: true });
    }

    function animateValue(el, end, duration) {
        var start = 0;
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var p = Math.min((ts - startTime) / duration, 1);
            var val = Math.floor(start + (end - start) * p);
            el.textContent = val.toLocaleString('ja-JP');
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    function initHeroCountUp() {
        var numbers = document.querySelectorAll('.hero .feature-number');
        if (!numbers.length || !('IntersectionObserver' in window)) return;
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting || entry.target.dataset.animated === '1') return;
                entry.target.dataset.animated = '1';
                var end = parseInt(entry.target.textContent.replace(/,/g, ''), 10);
                if (isNaN(end)) return;
                animateValue(entry.target, end, 1600);
            });
        }, { threshold: 0.4 });
        numbers.forEach(function (n) { obs.observe(n); });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initAOS();
        initFAQ();
        initSmoothScroll();
        initScrollIndicator();
        initHeroCountUp();
    });
})();
