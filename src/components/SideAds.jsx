import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from './useMediaQuery';

const LEFT_AD_ID = 'DAN-eWf8U6jXBmXYCT0w';
const RIGHT_AD_ID = 'DAN-D3zA6VFRHvl0RHfK';
const AD_WIDTH = 160;
const AD_HEIGHT = 600;

// 본문(최대 720px) 기준 한쪽 여유. 광고가 본문을 가리지 않도록 띄운다.
const CONTENT_HALF = 380;
const GAP = 20;

function SideAdSlot({ adUnitId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ins = document.createElement('ins');
    ins.className = 'kakao_ad_area';
    ins.style.display = 'none';
    ins.setAttribute('data-ad-unit', adUnitId);
    ins.setAttribute('data-ad-width', String(AD_WIDTH));
    ins.setAttribute('data-ad-height', String(AD_HEIGHT));

    const script = document.createElement('script');
    script.src = '//t1.kakaocdn.net/kas/static/ba.min.js';
    script.async = true;

    container.appendChild(ins);
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [adUnitId]);

  return <Slot ref={containerRef} />;
}

// 애드핏 정책: 페이지당 광고 단위 최대 4개.
// CSS로 숨기면 ins 태그가 DOM에 남아 카운트되므로,
// 좁은 화면에선 조건부 렌더링으로 DOM 자체에서 제외한다.
export default function SideAds() {
  const wideEnough = useMediaQuery('(min-width: 1180px)');
  if (!wideEnough) return null;

  return (
    <>
      <LeftWrap>
        <SideAdSlot adUnitId={LEFT_AD_ID} />
      </LeftWrap>
      <RightWrap>
        <SideAdSlot adUnitId={RIGHT_AD_ID} />
      </RightWrap>
    </>
  );
}

const LeftWrap = styled.div`
  position: fixed;
  top: 120px;
  width: ${AD_WIDTH}px;
  height: ${AD_HEIGHT}px;
  z-index: 30;
  left: calc(47% - ${CONTENT_HALF}px - ${GAP}px - ${AD_WIDTH}px);
`;

const RightWrap = styled.div`
  position: fixed;
  top: 120px;
  width: ${AD_WIDTH}px;
  height: ${AD_HEIGHT}px;
  z-index: 30;
  right: calc(47% - ${CONTENT_HALF}px - ${GAP}px - ${AD_WIDTH}px);
`;

const Slot = styled.div`
  width: ${AD_WIDTH}px;
  height: ${AD_HEIGHT}px;
`;
