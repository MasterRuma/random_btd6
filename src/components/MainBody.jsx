import React, { useState } from "react";
import { Button } from "@mui/material";

import HeroMap from "../data/hero.json";
import MapMap from "../data/map.json";
import TowerMap from "../data/tower.json";

const heroImgs = import.meta.glob("../assets/hero/*.webp", { eager: true });
const mapImgs = import.meta.glob("../assets/map/*_No_UI.webp", { eager: true });
const towerImgs = import.meta.glob("../assets/tower/*.webp", { eager: true });

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const MainBody = () => {
  const labels = ["맵", "영웅", "일차", "군사", "마법", "지원"];
  const [revealed, setRevealed] = useState(Array(6).fill(null));

  const handleMap = () => {
    const item = getRandomItem(MapMap);
    const fileName = item.en_map.replace(/\s+/g, "");
    const key = `../assets/map/${fileName}_No_UI.webp`;
    const imgSrc = mapImgs[key]?.default;

    return {
      en: item.en_map,
      kr: item.kr_map,
      img: imgSrc,
    };
  };

  const handleHero = () => {
    const item = getRandomItem(HeroMap);
    const key = `../assets/hero/${item.en_hero}.webp`;
    const imgSrc = heroImgs[key]?.default;

    return {
      en: item.en_hero,
      kr: item.kr_hero,
      img: imgSrc,
    };
  };

  const makeTowerHandler = (category) => () => {
    const filtered = TowerMap.filter((t) => t.category === category);
    const item = getRandomItem(filtered);
    const key = `../assets/tower/${item.en_tower}.webp`;
    const imgSrc = towerImgs[key]?.default;

    return {
      en: item.en_tower,
      kr: item.kr_tower,
      img: imgSrc,
    };
  };

  const handlers = [
    handleMap,
    handleHero,
    makeTowerHandler("primary"),
    makeTowerHandler("military"),
    makeTowerHandler("magic"),
    makeTowerHandler("support"),
  ];

  const handleClick = (index) => {
    const result = handlers[index]();
    setRevealed((prev) => {
      const updated = [...prev];
      updated[index] = result;
      return updated;
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <table
        border="1"
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed", // 🔐 고정 레이아웃
          width: "90%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            {labels.map((label, idx) => (
              <th key={idx}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 1행: 이미지 */}
          <tr>
            {revealed.map((item, idx) => (
              <td key={idx}>
                {item?.img ? (
                  <img
                    src={item.img}
                    alt={item.en}
                    width="120"
                    style={{ borderRadius: "8px" }}
                  />
                ) : (
                  "-"
                )}
              </td>
            ))}
          </tr>

          {/* 3행: 한국어 이름 */}
          <tr>
            {revealed.map((item, idx) => (
              <td key={idx}>{item?.kr || "-"}</td>
            ))}
          </tr>

          {/* 4행: 뽑기 버튼 */}
          <tr>
            {labels.map((_, index) => (
              <td key={index}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClick(index)}
                >
                  뽑기
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MainBody;
