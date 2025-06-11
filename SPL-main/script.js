document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.intro-overlay');
    const logo   = document.getElementById('logo-text');
    const main    = document.getElementById('main-content');


    // 1) 텍스트 길이 측정
    const length = logo.getComputedTextLength();

    // 2) dasharray, dashoffset에 동일한 값 세팅 → “보이지 않는 상태”
    logo.style.strokeDasharray  = length;
    logo.style.strokeDashoffset = length;

    // 3) 레이아웃 리플로우 강제 → transition이 제대로 작동
    logo.getBoundingClientRect();

    // 4) 애니메이션: dashoffset을 0으로 바꿔서 “그려지는” 효과
    logo.style.transition       = 'stroke-dashoffset 3s ease-in-out';
    logo.style.strokeDashoffset = '0';

    // 5) 글씨 그리기 애니메이션 끝나면 오버레이 페이드 아웃
    logo.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'stroke-dashoffset') {
            overlay.classList.add('fade-out');
        }
    });

    // 오버레이 투명도(=opacity) 트랜지션이 끝나면
    overlay.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity') {
            // 1.5초 대기 후 오버레이 제거 & 본문 노출
            setTimeout(() => {
                overlay.style.display = 'none';
                main.style.visibility = 'visible';
            }, 3000); // 1500ms = 1.5초
        }
    });
});
