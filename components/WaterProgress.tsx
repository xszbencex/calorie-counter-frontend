import {keyframes} from '@emotion/react';
import styled from '@emotion/styled';
import {useEffect, useState} from 'react';

export function WaterProgress(props: {target?: number, current?: number, width?: number, children: JSX.Element}) {
  const {target, current, children, width} = props;
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const percentage = !target || !current ? 0 : Math.round((current / target) * 100);
    const oldRange = 100; // 100 - 0
    const newRange = 80 - 4;
    const newVal = ((percentage * newRange) / oldRange) + 4; // percentage - 0
    setProgress(newVal);
  }, [target, current]);

  const fill = keyframes`
    0% { height: 0; }
    100% { height: ${progress}%; }
  `;

  const Water = styled('rect')`
    animation: ${fill} 0.2s ease-in-out forwards 
  `;

  return (
    <div style={{width: width ?? 100, position: 'relative'}}>
      <div className="progress-text-container">
        {children}
      </div>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 51">
        <defs>
          <mask id="water-mask">
            <Water fill="#029ffa" x="477" y="108" width="15" height="400" transform="rotate(-180 247.5 78.5)"/>
          </mask>
        </defs>
        <path
          className="bottle"
          d={'M19 21.1L15 8.74V6a2.3 2.3 0 0 0-.14-.9 1.54 1.54 0 0 0 .14-.65V3c0-.85-.35-1.5-1.19-1.5H7.86C7.02 1.5 6 2.15 6 ' +
          '3v1.47a1.55 1.55 0 0 0 .22.79 1.32 1.32 0 0 0-.22.76v2.72L2 21.09a12.12 12.12 0 0 0-.51 3.21v22.1a3.29 3.29 0 0 0 3' +
          '.15 3.1h12a2.92 2.92 0 0 0 2.85-3.1V24.3a12.14 12.14 0 0 0-.49-3.2zM7.69 3h5.81v1.47a3.12 3.12 0 0 0 .31.08h-.08l-6' +
          '-.05zM18 46.4a1.63 1.63 0 0 1-1.4 1.58H4.65C3.93 47.98 3 46.85 3 46.4V24.3a11 11 0 0 1 .61-2.73L7.72 9.1l.08-3a3.72' +
          ' 3.72 0 0 1 .88-.06h4.82v2.79l4.06 12.71a10.67 10.67 0 0 1 .44 2.73z'}
          fill={'#006fab'}
        />
        <path mask="url(#water-mask)" d="M4.7 46.5v-23l4-14h4l4 14v23" fill="#029ffa"/>
      </svg>
    </div>
  );
}
