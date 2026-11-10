(function () {
  const icons = {
    dialogue: ['M43.5 8.20996C34.4677 8.20996 28.0699 16.4211 26 20.5267C28.2581 24.1191 36.2742 30.7906 43.5 30.7906C50.7258 30.7906 58.7419 24.6322 61 20.5267C58.9301 16.4211 52.5323 8.20996 43.5 8.20996ZM49.7104 18.9362C49.7104 22.3658 46.9302 25.1459 43.5007 25.1459C40.0712 25.1459 37.291 22.3658 37.291 18.9362C37.291 15.5067 40.0712 12.7266 43.5007 12.7266C46.9302 12.7266 49.7104 15.5067 49.7104 18.9362Z'],
    relax: ['M134.74 16.2425L132.192 9.06901C132.176 9.02314 132.155 8.97917 132.129 8.93787C131.806 8.42063 131.013 8.5644 130.88 9.15928C130.149 12.4229 129.646 13.4885 128.905 16.2647C127.948 19.8515 123.214 18.1198 122.278 16.2647C121.454 14.6302 117.34 13.5619 116.578 15.2269C115.521 17.5399 115.185 20.3196 116.658 22.7576C119.381 27.2646 126.225 27.4944 130.128 25.1344C131.299 24.4263 133.086 24.3716 134.232 25.1184C138.117 27.648 144.765 28.4333 146.301 22.3409C147.455 17.7671 145.723 13.8811 143.3 11.9139C142.277 11.0839 141.039 11.9965 141.2 13.3036C141.381 14.7654 141.55 15.8513 141.008 16.5071C139.762 18.0141 137.441 19.9192 135.002 16.735C134.889 16.5871 134.802 16.418 134.74 16.2425Z'],
    report: ['M205.424 21.7784L217.604 27.6433C218.079 27.8718 218.455 28.2763 218.575 28.789C219.145 31.2173 218.657 33.7725 221.005 34.8918L221.252 35C221.167 34.9656 221.084 34.9295 221.005 34.8918L205.639 28.1654C205.389 28.0563 205.161 27.9005 204.993 27.6866C204.033 26.4651 203.267 24.4132 203.337 22.711C203.38 21.691 204.504 21.3355 205.424 21.7784Z', 'M213.004 19.9802C214.917 17.2483 216.171 13.3195 216.659 9.9452C216.862 8.54392 218.32 7.57419 219.634 8.10151L233.078 13.4963C233.836 13.8006 234.345 14.536 234.242 15.3465C233.278 22.9406 224.895 35 222.704 35C220.742 35 220.487 31.1892 220.455 28.5968C220.445 27.815 219.995 27.1048 219.284 26.7789L213.771 24.2502C212.299 23.5753 212.076 21.3064 213.004 19.9802Z'],
    me: ['M315.5 10.8078C315.5 15.4027 310.5 18.9444 306.5 20.141C310.5 21.5769 318.5 25.5974 318.5 30.1923C318.5 35.9359 294.5 35.9359 294.5 30.1923C294.5 25.5974 301.929 21.3951 305.643 19.8683C301.461 18.4635 297 15.0938 297 10.8077C297 5.0641 315.5 5.06416 315.5 10.8078Z']
  };
  const transforms = { dialogue: 'translate(11 6)', relax: 'translate(12 6)', report: 'translate(12 6)', me: 'translate(12 6)' };
  const labels = { dialogue: 'Dialogue', relax: 'Relax', report: 'Report', me: 'Me' };
  Object.entries(icons).forEach(([tab, paths]) => {
    document.querySelectorAll(`.iw-glass-nav [data-tab="${tab}"] .iw-nav-art`).forEach((svg) => {
      const artwork = Array.from(svg.children).filter((node) => node.tagName.toLowerCase() !== 'defs');
      artwork.forEach((node) => node.remove());
      paths.forEach((data) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', data);
        path.setAttribute('fill', 'currentColor');
        path.setAttribute('transform', transforms[tab]);
        if (tab === 'dialogue') {
          path.setAttribute('fill-rule', 'evenodd');
          path.setAttribute('clip-rule', 'evenodd');
        }
        svg.append(path);
      });
      const button = svg.closest('button');
      if (button && !button.querySelector('.iw-nav-label')) {
        const label = document.createElement('span');
        label.className = 'iw-nav-label';
        label.textContent = labels[tab];
        button.append(label);
      }
    });
  });

  document.querySelectorAll('.iw-options button[data-option-text]').forEach((button) => {
    if (button.querySelector('.iw-option-label')) return;
    const label = document.createElement('span');
    label.className = 'iw-option-label';
    label.textContent = button.dataset.optionText;
    button.append(label);
  });

  document.querySelectorAll('.iw-relax-mode-switch button[data-relax-mode]').forEach((button) => {
    if (button.querySelector('.iw-mode-label')) return;
    const label = document.createElement('span');
    label.className = 'iw-mode-label';
    label.textContent = button.dataset.relaxMode === 'breathe' ? 'Breathe' : 'Meditate';
    button.append(label);
  });

  const breathing = document.querySelector('#iw-breathing');
  [['breath-label-inhale', 'Inhale'], ['breath-label-exhale', 'Exhale']].forEach(([id, value]) => {
    const group = breathing?.querySelector(`#${id}`);
    if (!group) return;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '38');
    text.setAttribute('y', '18');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '20');
    text.setAttribute('font-weight', '500');
    text.setAttribute('fill', '#805FE3');
    text.textContent = value;
    group.replaceChildren(text);
  });
  [['breath-start-art', 'Start'], ['breath-end-art', 'End']].forEach(([id, value]) => {
    const group = breathing?.querySelector(`#${id}`);
    if (!group) return;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', '94');
    text.setAttribute('y', '16.5');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '15');
    text.setAttribute('font-weight', '500');
    text.setAttribute('fill', '#272727');
    text.textContent = value;
    group.replaceChildren(text);
  });

  document.querySelectorAll('.iw-composer').forEach((composer) => {
    if (composer.querySelector('.iw-inline-action')) return;
    const actions = [
      ['plus', 'Add a photo', '.iw-quick-actions [data-quick-action="post"]'],
      ['feeling', 'Choose a feeling', '.iw-quick-actions [data-quick-action="feeling"]']
    ];
    actions.forEach(([name, label, targetSelector]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `iw-inline-action iw-inline-action-${name}`;
      button.setAttribute('aria-label', label);
      button.addEventListener('pointerdown', (event) => event.stopPropagation());
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        document.querySelector(targetSelector)?.click();
      });
      composer.append(button);
    });
  });

  document.querySelectorAll('nav.iw-glass-nav').forEach((nav) => {
    const scene = nav.querySelector('.iw-nav-lens-scene');
    if (!scene) return;
    scene.setAttribute('viewBox', '0 0 374 70');
    scene.replaceChildren();
    nav.querySelectorAll(':scope > button[data-tab] .iw-nav-art').forEach((art) => {
      Array.from(art.children).forEach((node) => {
        if (node.tagName.toLowerCase() !== 'defs') scene.append(node.cloneNode(true));
      });
    });
  });
})();
