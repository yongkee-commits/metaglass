// 화요일의 질문 — 랜딩 페이지 스크립트

// 사전 신청 접수처. Formspree, Tally, Google Apps Script 등 POST를 받는 URL을 넣으세요.
const ENDPOINT = '';

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { 'stroke-width': 2, 'aria-hidden': 'true' } });
  }
}

function initForm() {
  const form = document.getElementById('waitlist-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (!ENDPOINT) {
      status.dataset.state = 'todo';
      status.textContent = '접수처가 아직 연결되지 않았습니다. main.js의 ENDPOINT를 설정해 주세요.';
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.dataset.state = 'sending';
    status.textContent = '보내는 중입니다.';
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      status.dataset.state = 'ok';
      status.textContent = '신청되었습니다. 출시일이 정해지면 가장 먼저 알려 드릴게요.';
      form.reset();
    } catch (err) {
      status.dataset.state = 'error';
      status.textContent = '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';
    } finally {
      button.disabled = false;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initForm();
});
