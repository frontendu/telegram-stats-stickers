#!/usr/bin/env ts-node-script

import React from 'react';
import got from 'got';
import { writeFileSync, mkdirSync } from 'fs';
import { renderToStaticMarkup } from 'react-dom/server';

type StickerProps = {
  count: number
};

const Sticker = ({count}: StickerProps) => (
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="white"/>
    <text 
      style={{fontSize: 128, fontFamily: 'sans-serif', fontWeight: 'bold'}} 
      x="50%"
      y="289"
      textAnchor="middle" 
      stroke="#000"
    >
      {count}
    </text>
  </svg>
);

(async function make() {
  const { body } = await got('https://soundcloud.com/frontend_u');
  const [, count] = body.match(/"followers_count":(\d*)/);
  try { mkdirSync('dist/') } catch (e) {}
  writeFileSync('dist/sticker.svg', renderToStaticMarkup(<Sticker count={Number.parseInt(count)} />));
})();
