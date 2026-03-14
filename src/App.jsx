import React, { useState, useMemo, useRef, useEffect, createContext, useContext } from "react";

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────
const ThemeContext = createContext("light");
const useTheme = () => useContext(ThemeContext);


const THEMES = {
  dark: {
    bg:"#060d08",bgGrad:"radial-gradient(ellipse at 18% 0%,rgba(26,107,60,0.13) 0%,transparent 55%),radial-gradient(ellipse at 82% 100%,rgba(26,107,60,0.06) 0%,transparent 50%)",bgCard:"rgba(255,255,255,0.03)",bgCardHover:"rgba(255,255,255,0.055)",bgInput:"rgba(255,255,255,0.06)",bgSelect:"#0a1a0f",bgPanel:"#081008",bgHeader:"#060d08",bgTabActive:"rgba(255,255,255,0.06)",bgChip:"rgba(255,255,255,0.04)",bgBoMsg:"rgba(26,107,60,0.12)",bgUserMsg:"rgba(255,255,255,0.05)",bgTag:"rgba(255,255,255,0.04)",
    border:"rgba(255,255,255,0.06)",borderMid:"rgba(255,255,255,0.08)",borderInput:"rgba(255,255,255,0.1)",borderAccent:"rgba(26,107,60,0.3)",borderTabActive:"#1a6b3c",borderDash:"rgba(255,255,255,0.07)",borderHr:"rgba(255,255,255,0.05)",
    textPrimary:"#ffffff",textSecondary:"rgba(255,255,255,0.75)",textMuted:"rgba(255,255,255,0.68)",textFaint:"rgba(255,255,255,0.48)",textGhost:"rgba(255,255,255,0.35)",textLabel:"rgba(255,255,255,0.55)",textTabInactive:"rgba(255,255,255,0.58)",
    accent:"#00e676",accentMid:"#69f0ae",accentForest:"#1a6b3c",accentGlow:"rgba(26,107,60,0.45)",accentBg:"rgba(26,107,60,0.12)",accentBorder:"rgba(26,107,60,0.3)",accentText:"#00e676",
    ringTrack:"rgba(255,255,255,0.06)",barTrack:"rgba(255,255,255,0.08)",
    boButtonBg:"rgba(26,107,60,0.12)",boButtonActiveBg:"rgba(26,107,60,0.3)",
    toggleBg:"rgba(255,255,255,0.06)",toggleBorder:"rgba(255,255,255,0.12)",toggleText:"rgba(255,255,255,0.5)",paceSlowColor:"#ef5350",
  },
  light: {
    bg:"#f5f3ef",bgGrad:"radial-gradient(ellipse at 18% 0%,rgba(26,107,60,0.07) 0%,transparent 55%),radial-gradient(ellipse at 82% 100%,rgba(26,107,60,0.04) 0%,transparent 50%)",bgCard:"#ffffff",bgCardHover:"#fafaf8",bgInput:"#ffffff",bgSelect:"#ffffff",bgPanel:"#ffffff",bgHeader:"#ffffff",bgTabActive:"rgba(26,107,60,0.06)",bgChip:"#f0ede8",bgBoMsg:"rgba(26,107,60,0.07)",bgUserMsg:"#f0ede8",bgTag:"#f0ede8",
    border:"rgba(0,0,0,0.07)",borderMid:"rgba(0,0,0,0.09)",borderInput:"rgba(0,0,0,0.12)",borderAccent:"rgba(26,107,60,0.25)",borderTabActive:"#1a6b3c",borderDash:"rgba(0,0,0,0.1)",borderHr:"rgba(0,0,0,0.07)",
    textPrimary:"#111111",textSecondary:"rgba(0,0,0,0.75)",textMuted:"rgba(0,0,0,0.62)",textFaint:"rgba(0,0,0,0.48)",textGhost:"rgba(0,0,0,0.38)",textLabel:"rgba(0,0,0,0.58)",textTabInactive:"rgba(0,0,0,0.58)",
    accent:"#1a6b3c",accentMid:"#2d9958",accentForest:"#1a6b3c",accentGlow:"rgba(26,107,60,0.2)",accentBg:"rgba(26,107,60,0.07)",accentBorder:"rgba(26,107,60,0.22)",accentText:"#1a6b3c",
    ringTrack:"rgba(0,0,0,0.08)",barTrack:"rgba(0,0,0,0.08)",
    boButtonBg:"rgba(26,107,60,0.08)",boButtonActiveBg:"rgba(26,107,60,0.15)",
    toggleBg:"#f0ede8",toggleBorder:"rgba(0,0,0,0.1)",toggleText:"rgba(0,0,0,0.5)",paceSlowColor:"#c62828",
  }
};
// ─── DATA ────────────────────────────────────────────────────────────────────

const PLAYERS_2425 = [
  { rank:1, name:"Aaron Rhooms", team:"Toronto Metropolitan", year:"Y4", pos:"Guard", ht:'6\'4"', wt:200, sys:"Isolation / P&R", pace:76.4, sos:0.90, stat:86.4, fit:72.0, elig:40, demand:62.7, ctx:92, ns:71.8, fit1:"Maryland", fit1s:113.7, fit2:"St. John's", fit2s:108.8, fit3:"Marquette", fit3s:103.6, ppg:21.6, rpg:6.5, apg:2.0, best:"21.6 PPG / 6.5 RPG (2024-25, Y4) — U SPORTS Player of the Year; 47.2% FG / 41.6% 3PT, TMU", fgp:47.2, tpp:41.6, ftp:77.8, spg:1.7, bpg:0.5, tov:2.1, mpg:29.7, gp:24, gs:24, hometown:"Toronto", province:"ON", major:"Business", injury:null, verified:true, awards:["🏆 OUA Player of the Year (2024-25)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)"], season:"2024-25", needsUpdate:false},

  
  { rank:2, name:"D.J. Jackson", verified:true,            team:"StFX",                 year:"Y3", pos:"Guard",   ht:'6\'4"', wt:190,   sys:"Isolation / P&R", pace:80.3, sos:0.75, stat:79.9, fit:69.7, elig:60,  demand:62.7, ctx:78,  ns:70.5, fit1:"Maryland",           fit1s:113.7, fit2:"St. John's",             fit2s:108.8,  fit3:"Marquette",       fit3s:103.6 , ppg:24.4, rpg:7.4, apg:4.1, best:"24.4 PPG / 7.4 RPG / 4.1 APG (2024-25, Y3) — AUS scoring leader; U SPORTS 1st Team All-Canadian" , fgp:43.5, tpp:28.1, ftp:86.3 , spg:2.2, bpg:0.9, tov:1.6, mpg:31.8, gp:18, gs:18, hometown:"Dartmouth", province:"NS", major:"Kinesiology", injury:null , verified:true , awards:["🏆 AUS Player of the Year (2024-25)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)", "⭐ AUS 1st Team All-Star (2024-25)", "🥇 U SPORTS Scoring Champion (24.4 PPG, 2024-25)"] , season:"2024-25"},
  { rank:4,  name:"Zubair Seyed",            team:"Ontario Tech",         year:"Y3", pos:"Guard",   ht:'6\'0"', wt:null,  sys:"Isolation / P&R", pace:74.7, sos:0.90, stat:67.0, fit:71.6, elig:60,  demand:62.7, ctx:92,  ns:68.2, fit1:"South Florida",     fit1s:96.1,  fit2:"St. John's",       fit2s:95.6,  fit3:"Boise State", fit3s:106.8 , ppg:19.3, rpg:4.7, apg:4.8, best:"19.3 PPG / 4.7 RPG / 4.8 APG (2024-25, Y3) — OUA 3rd Team All-Star; turned professional after 2024-25 season" , fgp:44.7, tpp:31.7, ftp:72.2 , spg:1.9, bpg:0.3, tov:3.1, mpg:35.9, gp:19, gs:19, hometown:"Oshawa", province:"ON", major:"Computer Science", injury:null , verified:true , awards:["⭐ OUA 3rd Team All-Star (2024-25)"] , season:"2024-25", unavailable:"Turned professional (2025)"},
  { rank:5,  name:"Yohann Sam",              team:"Windsor",              year:"Y4", pos:"Guard",  ht:'6\'5"', wt:225,   sys:"Isolation / P&R", pace:78.8, sos:1.00, stat:73.7, fit:70.6, elig:40,  demand:62.7, ctx:100, ns:68.2, fit1:"Marquette",          fit1s:112.6, fit2:"Seton Hall",     fit2s:105.5,  fit3:"Maryland",          fit3s:104.7 , ppg:18.3, rpg:6.2, apg:1.6, best:"18.3 PPG / 6.2 RPG (2024-25, Y4) — CEBL draft pick (Brampton Honey Badgers)" , fgp:38.5, tpp:35.9, ftp:78.5 , spg:1.3, bpg:0.1, tov:2.8, mpg:30.7, gp:19, gs:19, hometown:"Brampton", province:"ON", major:"Human Kinetics", injury:null , verified:true , awards:["⭐ OUA 3rd Team All-Star (2024-25)", "🏀 CEBL Draft Pick — Brampton Honey Badgers (2025)"] , season:"2024-25"},
  { rank:3, name:"Oliver Engen",            team:"Queen's",              year:"Y1", pos:"Guard",   ht:'6\'4"', wt:null,  sys:"Press System",    pace:86.8, sos:1.00, stat:81.3, fit:34.4, elig:100, demand:62.7, ctx:100, ns:68.7, fit1:"Memphis",           fit1s:91.8,  fit2:"Bucknell",          fit2s:88.0,  fit3:"Missouri",               fit3s:99.8 , ppg:19.8, rpg:4.2, apg:3.4, best:"19.8 PPG / 4.2 RPG / 3.4 APG (2024-25, Y1) — U SPORTS Rookie of the Year; OUA Rookie of the Year" , fgp:50.2, tpp:26.6, ftp:89.7 , spg:0.9, bpg:0.1, tov:2.0, mpg:29.7, gp:29, gs:29, hometown:"Kingston", province:"ON", major:"Engineering", injury:null , verified:true , awards:["🏆 U SPORTS Rookie of the Year (2024-25)", "🏆 OUA Rookie of the Year (2024-25)", "⭐ OUA 1st Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:7,  name:"Simeon Smith",            team:"Windsor",              year:"Y3", pos:"Guard",   ht:'6\'4"', wt:null,  sys:"Isolation / P&R", pace:78.8, sos:1.00, stat:57.3, fit:70.6, elig:60,  demand:62.7, ctx:100, ns:65.7, fit1:"Marquette",          fit1s:112.6, fit2:"Seton Hall",     fit2s:105.5,  fit3:"Maryland",          fit3s:104.7 , ppg:16.3, rpg:4.8, apg:3.0, best:"16.3 PPG / 4.8 RPG (2024-25, Y3) — did not play 2025-26; in transfer portal" , fgp:46.3, tpp:31.3, ftp:63.1 , spg:1.6, bpg:0.2, tov:2.5, mpg:28.6, gp:23, gs:16, hometown:"Windsor", province:"ON", major:"Sociology", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:8,  name:"Taye Donald",             team:"Laurier",              year:"Y4", pos:"Guard",   ht:'6\'2"', wt:180,   sys:"Isolation / P&R", pace:71.5, sos:0.90, stat:68.3, fit:69.4, elig:40,  demand:62.7, ctx:92,  ns:65.7, fit1:"Pacific",           fit1s:97.1,  fit2:"Rutgers",          fit2s:86.5,  fit3:"Boise State",     fit3s:106.8 , ppg:19.5, rpg:4.9, apg:4.3, best:"19.5 PPG (2024-25, Y4) — OUA 2nd Team All-Star" , fgp:38.7, tpp:29.1, ftp:78.2 , spg:1.3, bpg:0.1, tov:2.1, mpg:31.9, gp:19, gs:19, hometown:"Waterloo", province:"ON", major:"Economics", injury:null , verified:true , awards:["⭐ OUA 2nd Team All-Star (2024-25)", "⭐ OUA 3rd Team All-Star (2022-23)", "🏅 3× OUA All-Star (2022-23, 2023-24, 2024-25)"] , season:"2024-25"},
  { rank:9, name:"Darnaz Mabanza",          team:"Nipissing",            year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Isolation / P&R", pace:76.4, sos:0.90, stat:54.9, fit:71.8, elig:60,  demand:62.7, ctx:92,  ns:64.7, fit1:"Maryland",           fit1s:113.7, fit2:"St. John's",      fit2s:108.8, fit3:"Marquette",   fit3s:103.6 , ppg:17.4, rpg:4.8, apg:4.0, best:"17.4 PPG (2024-25, Y3)" , fgp:34.6, tpp:28.4, ftp:71.1 , spg:2.2, bpg:0.5, tov:2.9, mpg:32.4, gp:20, gs:20, hometown:"North Bay", province:"ON", major:"Business", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:10, name:"Nathan Petrone", verified:true,          team:"Calgary",              year:"Y4", pos:"Guard",   ht:'6\'2"', wt:183,   sys:"Transition",      pace:84.3, sos:0.85, stat:89.8, fit:44.3, elig:40,  demand:62.7, ctx:73,  ns:64.3, fit1:"Memphis",           fit1s:108.9, fit2:"Buffalo",          fit2s:93.8,  fit3:"Missouri",           fit3s:99.8 , ppg:24.2, rpg:3.6, apg:4.95, best:"24.2 PPG (2024-25, Y4) — CW scoring leader; 38pt CW Final game" , fgp:56.8, tpp:43.0, ftp:89.1 , spg:1.2, bpg:0.1, tov:2.7, mpg:33.1, gp:20, gs:20, hometown:"Calgary", province:"AB", major:"Kinesiology", injury:null , verified:true , awards:["🏆 U SPORTS Player of the Year (2023-24)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)", "⭐ U SPORTS 1st Team All-Canadian (2023-24)", "🏅 CW Player of the Year (2024-25)", "⭐ CW 1st Team All-Star (2024-25)", "⭐ CW 1st Team All-Star (2023-24)", "🏆 CW Male Athlete of the Year (2024-25)"] , season:"2024-25"},
  { rank:6, name:"Isaac Simon",             team:"Alberta",              year:"Y3", pos:"Guard",   ht:'6\'2"', wt:180,   sys:"Isolation / P&R", pace:72.5, sos:0.85, stat:67.1, fit:70.2, elig:60,  demand:62.7, ctx:73,  ns:66.4, fit1:"Marquette",         fit1s:112.6, fit2:"Seton Hall",       fit2s:105.5, fit3:"Maryland",        fit3s:104.7 , ppg:18.8, rpg:5.3, apg:4.2, best:"18.8 PPG / 5.3 RPG / 4.2 APG (2024-25, Y3) — CW 2nd Team All-Star; Alberta" , fgp:42.7, tpp:30.2, ftp:67.5 , spg:1.3, bpg:0.3, tov:3.3, mpg:29.8, gp:26, gs:26, hometown:"Edmonton", province:"AB", major:"Business", injury:null , verified:true , awards:["⭐ CW 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:17, name:"Iñaki Alvarez",            team:"Toronto",              year:"Y5", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Isolation / P&R", pace:73.9, sos:0.90, stat:53.6, fit:71.2, elig:20,  demand:62.7, ctx:92,  ns:59.3, fit1:"Marquette",         fit1s:112.6, fit2:"Seton Hall",       fit2s:105.5, fit3:"Maryland",           fit3s:104.7 , ppg:17.2, rpg:3.1, apg:5.2, best:"17.2 PPG (2024-25, Y5) — signed pro in Spain post-season" , fgp:37.1, tpp:30.5, ftp:55.2 , spg:1.6, bpg:0.2, tov:3.0, mpg:31.9, gp:17, gs:17, hometown:"Toronto", province:"ON", major:"Political Science", injury:null , verified:true , awards:[] , season:"2024-25", unavailable:"Signed professional (Spain, 2025)"},
  { rank:22, name:"Alvin Icyogere",           team:"Nipissing",            year:"Y2", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Isolation / P&R", pace:76.4, sos:0.90, stat:42.1, fit:71.8, elig:80,  demand:62.7, ctx:92,  ns:56.0, fit1:"Maryland",           fit1s:113.7, fit2:"Marquette",        fit2s:103.6, fit3:"St. John's", fit3s:108.8 , ppg:14.5, rpg:5.1, apg:1.6, best:"14.5 PPG / 5.1 RPG (2024-25, Y2)" , fgp:37.9, tpp:29.2, ftp:81.8 , spg:0.7, bpg:0.6, tov:2.3, mpg:30.5, gp:16, gs:16, hometown:"Ottawa", province:"ON", major:"Health Sciences", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:29, name:"Keon Baker",            team:"Ontario Tech",         year:"Y5", pos:"Guard",   ht:'6\'4"', wt:null,  sys:"Isolation / P&R", pace:74.7, sos:0.90, stat:36.6, fit:71.6, elig:20,  demand:62.7, ctx:92,  ns:54.3, fit1:"South Florida",     fit1s:95.0,  fit2:"St. John's",       fit2s:94.5,  fit3:"Boise State", fit3s:106.8 , ppg:14.5, rpg:3.6, apg:1.6, best:"14.5 PPG / 3.6 RPG (2024-25, Y5)" , fgp:42.0, tpp:34.6, ftp:67.1 , spg:1.7, bpg:0.5, tov:2.5, mpg:27.0, gp:15, gs:11, hometown:"Oshawa", province:"ON", major:"Commerce", injury:null , verified:true , awards:["⭐ U SPORTS 1st Team All-Canadian (2023-24)", "⭐ OUA 2nd Team All-Star (2023-24)"] , season:"2024-25"},
  { rank:12, name:"Sultan Haider Bhatti", verified:true,    team:"Brandon",              year:"Y4", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Isolation / P&R", pace:78.0, sos:0.80, stat:59.6, fit:71.1, elig:40,  demand:62.7, ctx:69,  ns:61.6, fit1:"Marquette",          fit1s:112.6, fit2:"Seton Hall",       fit2s:105.5, fit3:"Maryland",                  fit3s:104.7 , ppg:20.4, rpg:10.7, apg:4.5, best:"20.4 PPG / 10.7 RPG (2024-25, Y4) — CW top rebounder" , fgp:44.4, tpp:34.1, ftp:79.6 , spg:1.1, bpg:0.1, tov:2.9, mpg:31.2, gp:20, gs:20, hometown:"Brandon", province:"MB", major:"Business Admin", injury:null , verified:true , awards:["⭐ U SPORTS 2nd Team All-Canadian (2024-25)", "⭐ CW 1st Team All-Star (2024-25)", "⭐ CW 2nd Team All-Star (2023-24)"] , season:"2024-25"},
  { rank:13, name:"Ankit Choudhary", verified:true,         team:"Ottawa",               year:"Y4", pos:"Guard",   ht:'6\'3"', wt:195,   sys:"Pick & Roll",     pace:74.4, sos:1.00, stat:53.7, fit:67.6, elig:40,  demand:62.7, ctx:100, ns:61.5, fit1:"Michigan",          fit1s:98.8,  fit2:"Butler",           fit2s:91.0,  fit3:"Boise State",       fit3s:106.8 , ppg:15.3, rpg:3.8, apg:5.6, best:"15.3 PPG (2024-25, Y4) — OUA 2nd Team All-Star" , fgp:43.4, tpp:39.3, ftp:89.7, spg:1.4, bpg:0.1, tov:3.2, mpg:32.6, gp:22, gs:22, hometown:"Ottawa", province:"ON", major:"Computer Science", injury:null , verified:true , awards:["⭐ OUA 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:19, name:"Keivonte Watts",          team:"Mount Royal",          year:"Y5", pos:"Guard",   ht:'6\'1"', wt:null,  sys:"Isolation / P&R", pace:75.0, sos:0.80, stat:56.7, fit:71.7, elig:20,  demand:62.7, ctx:69,  ns:58.5, fit1:"South Florida",     fit1s:95.9,  fit2:"St. John's",       fit2s:95.4,  fit3:"Boise State", fit3s:106.8 , ppg:19.9, rpg:4.9, apg:3.5, best:"19.9 PPG (2024-25, Y4) — CW 3rd Team All-Star" , fgp:38.8, tpp:30.6, ftp:75.8 , spg:1.2, bpg:0.2, tov:2.2, mpg:32.3, gp:19, gs:19, hometown:"Calgary", province:"AB", major:"Kinesiology", injury:null , verified:true , awards:["⭐ CW 3rd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:11, name:"Jasha'jaun Downey",       team:"Saint Mary's",         year:"Y2", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:77.0, sos:0.75, stat:65.5, fit:52.7, elig:80,  demand:62.7, ctx:78,  ns:64.3, fit1:"Gonzaga",           fit1s:102.9, fit2:"Butler",           fit2s:102.7, fit3:"Missouri",          fit3s:106.8 , ppg:20.4, rpg:3.5, apg:2.5, best:"20.4 PPG / 3.5 RPG (2024-25, Y2) — OUA 2nd Team All-Star; Saint Mary's" , fgp:40.6, tpp:36.6, ftp:76.6 , spg:1.5, bpg:0.2, tov:2.2, mpg:32.1, gp:19, gs:19, hometown:"Halifax", province:"NS", major:"Health Sciences", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:14, name:"Flynn Boardman-Raffett", verified:true,  team:"Memorial",             year:"Y4", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Halfcourt",       pace:75.9, sos:0.75, stat:56.6, fit:64.7, elig:40,  demand:62.7, ctx:78,  ns:59.9, fit1:"Western Michigan",  fit1s:89.0,  fit2:"American", fit2s:87.0,  fit3:"Missouri",          fit3s:99.8 , ppg:21.2, rpg:8.6, apg:2.2, best:"21.2 PPG / 8.6 RPG (2024-25, Y4) — AUS 2nd Team All-Star" , fgp:47.8, tpp:33.0, ftp:69.5 , spg:1.1, bpg:0.2, tov:2.5, mpg:30.1, gp:18, gs:18, hometown:"St. John's", province:"NL", major:"Business", injury:null , verified:true , awards:["⭐ AUS 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:15, name:"Noah Otshudi",          team:"Western",              year:"Y3", pos:"Guard",   ht:'6\'6"', wt:220,   sys:"Motion Offense",  pace:79.2, sos:0.90, stat:54.9, fit:51.5, elig:60,  demand:62.7, ctx:92,  ns:59.6, fit1:"Gonzaga",           fit1s:105.2, fit2:"Butler",           fit2s:100.7, fit3:"Missouri",          fit3s:106.8 , ppg:17.4, rpg:3.0, apg:4.0, best:"17.4 PPG (2024-25, Y3) — signed with Marshall (NCAA DI)" , fgp:46.0, tpp:35.1, ftp:74.6 , spg:0.9, bpg:1.2, tov:1.9, mpg:30.0, gp:21, gs:21, hometown:"London", province:"ON", major:"Kinesiology", injury:null , verified:true , awards:["⭐ OUA 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:16, name:"Justin Ndjock-Tadjore",   team:"Ottawa",               year:"Y4", pos:"Forward",   ht:'6\'4"', wt:200,   sys:"Pick & Roll",     pace:74.4, sos:1.00, stat:47.3, fit:67.6, elig:40,  demand:62.7, ctx:100, ns:59.6, fit1:"Michigan",          fit1s:98.5,  fit2:"Butler",           fit2s:90.7,  fit3:"Boise State",       fit3s:103.8 , ppg:14.6, rpg:5.6, apg:2.3, best:"14.6 PPG (2024-25, Y4) — OUA 1st Team All-Star; Ottawa" , fgp:50.9, tpp:31.3, ftp:55.6 , spg:1.0, bpg:0.6, tov:2.1, mpg:29.6, gp:22, gs:22, hometown:"Ottawa", province:"ON", major:"Political Science", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:27, name:"Aubrey Dorey-Havens",     team:"Carleton",             year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:73.0, sos:1.00, stat:35.5, fit:51.8, elig:60,  demand:62.7, ctx:100, ns:54.5, fit1:"Butler",            fit1s:102.5, fit2:"Gonzaga",          fit2s:97.5,  fit3:"Missouri",          fit3s:106.8,  ppg:15.3, rpg:4.5, apg:5.6, best:"10.5 PPG / 4.5 RPG / 5.6 APG (2024-25, Y3) — OUA assists leader; Carleton", fgp:33.3, tpp:27.3, ftp:77.8, spg:0.7, bpg:0.1, tov:2.5, mpg:28.3, gp:22, gs:22, hometown:"North Vancouver", province:"BC", major:"Business", injury:null, verified:true, awards:["⭐ OUA 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:32, name:"Moody Qasim",          team:"McMaster",             year:"Y5", pos:"Forward",   ht:'6\'1"', wt:null,  sys:"Isolation / P&R", pace:74.4, sos:1.00, stat:26.0, fit:71.4, elig:20,  demand:62.7, ctx:100, ns:51.7, fit1:"South Florida",     fit1s:93.7,  fit2:"Boise State",       fit2s:103.8,  fit3:"Georgetown",        fit3s:99.6 , ppg:11.6, rpg:5.8, apg:1.3, best:"11.6 PPG / 5.8 RPG (2024-25, Y5) — graduated after 2024-25 season" , fgp:43.9, tpp:30.2, ftp:78.6 , spg:0.8, bpg:0.2, tov:1.3, mpg:29.1, gp:19, gs:14, hometown:"Hamilton", province:"ON", major:"Commerce", injury:null , verified:true , awards:[] , season:"2024-25", unavailable:"Graduated (2025)"},
  { rank:18, name:"Nginyu Ngala",              team:"Laurentian",           year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Isolation / P&R", pace:69.0, sos:0.90, stat:38.9, fit:67.0, elig:60,  demand:62.7, ctx:92,  ns:58.7, fit1:"Pacific",           fit1s:95.0,  fit2:"Nevada",fit2s:93.5,  fit3:"Boise State",     fit3s:106.8 , ppg:14.9, rpg:4.6, apg:3.1, best:"14.9 PPG (2024-25, Y3) — transferred to Kansas Jayhawks (NCAA DI, Big 12)" , fgp:40.4, tpp:39.2, ftp:76.3 , spg:1.2, bpg:0.0, tov:2.4, mpg:29.0, gp:22, gs:22, hometown:"Sudbury", province:"ON", major:"Business Admin", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:20, name:"Xavier Spencer",          team:"Carleton",             year:"Y2", pos:"Guard",   ht:'6\'1"', wt:null,  sys:"Motion Offense",  pace:73.0, sos:1.00, stat:39.5, fit:51.8, elig:80,  demand:62.7, ctx:100, ns:58.1, fit1:"Butler",            fit1s:102.9, fit2:"Gonzaga",          fit2s:98.3,  fit3:"Missouri",          fit3s:106.8 , ppg:13.5, rpg:5.1, apg:2.3, best:"13.5 PPG (2024-25, Y2) — transferred to UMass Lowell (NCAA DI, AEC)" , fgp:42.0, tpp:35.1, ftp:78.7 , spg:1.6, bpg:0.3, tov:2.1, mpg:26.5, gp:22, gs:22, hometown:"Calgary", province:"AB", major:"Criminology", injury:null , verified:true , awards:["⭐ OUA 2nd Team All-Star (2024-25)", "🏆 U SPORTS Rookie of the Year (2023-24)", "🏆 OUA Rookie of the Year (2023-24)"] , season:"2024-25"},
  { rank:21, name:"Ryan Regault",            team:"Acadia",               year:"Y1", pos:"Guard",   ht:'6\'0"', wt:null,  sys:"Motion Offense",  pace:80.1, sos:0.75, stat:38.2, fit:50.4, elig:100, demand:62.7, ctx:78,  ns:58, fit1:"Buffalo",           fit1s:87.5,  fit2:"Bowling Green",    fit2s:84.0,  fit3:"Missouri",  fit3s:106.8 , ppg:12.4, rpg:3.7, apg:4.9, best:"12.4 PPG / 4.9 APG / 3.7 RPG (2024-25, Y1) — AUS Rookie of the Year" , fgp:36.5, tpp:30.6, ftp:82.8, spg:1.1, bpg:0.1, tov:2.5, mpg:28.8, gp:17, gs:17, hometown:"Scarborough", province:"ON", major:"Law and Society", injury:null, verified:true, awards:["🏆 AUS Rookie of the Year (2024-25)", "🌟 AUS All-Rookie Team (2024-25)"] , season:"2024-25"},
  { rank:33, name:"Kato Jaro",               team:"Winnipeg",             year:"Y2", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Pick & Roll",     pace:74.0, sos:0.80, stat:16.6, fit:62.0, elig:80,  demand:62.7, ctx:69,  ns:51.3, fit1:"South Florida",     fit1s:93.0,  fit2:"St. John's",       fit2s:92.0,  fit3:"Boston College", fit3s:100.8,  ppg:7.8, rpg:2.5, apg:1.6, best:"8.3 PPG / 2.5 RPG (2024-25, Y2) — CW 2nd Team All-Star", fgp:44.8, tpp:32.6, ftp:80.0, spg:1.3, bpg:0.1, tov:1.4, mpg:23.5, gp:14, gs:2, hometown:"Winnipeg", province:"MB", major:"Business Admin", injury:null, verified:true, awards:["⭐ CW 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:28, name:"Marcus Barnes",           team:"UNB",                  year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:74.0, sos:0.75, stat:40.8, fit:52.3, elig:60,  demand:62.7, ctx:78,  ns:54.4, fit1:"Indiana",           fit1s:114.0, fit2:"Butler",            fit2s:110.3, fit3:"Gonzaga",               fit3s:109.1,  ppg:14.2, rpg:4.0, apg:3.1, best:"14.2 PPG / 4.0 RPG / 3.1 APG (2024-25, Y3) — AUS 2nd Team All-Star; two-way guard, 1.7 SPG", fgp:38.0, tpp:30.2, ftp:70.0, spg:1.7, bpg:0.3, tov:2.0, mpg:31.0, gp:20, gs:20, hometown:"Kitchener", province:"ON", major:"Business Admin", injury:null, verified:true, awards:["⭐ AUS 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:23, name:"Renoldo Robinson",        team:"Victoria",             year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:51.8, fit:44.6, elig:60,  demand:62.7, ctx:73,  ns:55.4, fit1:"Memphis",           fit1s:97.1,  fit2:"Gonzaga",          fit2s:90.8,  fit3:"Boston College",               fit3s:93.8 , ppg:15.8, rpg:4.7, apg:2.2, best:"15.8 PPG / 4.7 RPG (2024-25, Y3) — U SPORTS 1st Team All-Canadian, National Champion" , fgp:44.3, tpp:38.4, ftp:77.7 , spg:2.3, bpg:0.1, tov:2.0, mpg:22.0, gp:26, gs:4, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null , verified:true , awards:["🏆 U SPORTS National Champion (2024-25)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)", "🏅 U SPORTS Tournament All-Star (2024-25)", "⭐ CW 1st Team All-Star (2024-25)", "🌟 U SPORTS All-Rookie Team (2022-23)"] , season:"2024-25"},
  { rank:24, name:"Nathan Bilamu",           team:"Lakehead",             year:"Y5", pos:"Wing",    ht:'6\'5"', wt:null,  sys:"Motion Offense",  pace:80.3, sos:0.90, stat:69.6, fit:50.9, elig:20,  demand:46.0, ctx:92,  ns:54.9, fit1:"Gonzaga",           fit1s:107.0, fit2:"Illinois",         fit2s:100.6, fit3:"Wake Forest",            fit3s:102.0 , ppg:19.7, rpg:4.5, apg:3.8, best:"19.7 PPG (2024-25, Y5) — U SPORTS 2nd Team All-Canadian" , fgp:43.0, tpp:34.4, ftp:74.1 , spg:1.4, bpg:0.7, tov:2.3, mpg:33.0, gp:21, gs:21, hometown:"Thunder Bay", province:"ON", major:"Kinesiology", injury:"Knee (pre-season, cleared)" , verified:true , awards:["⭐ U SPORTS 2nd Team All-Canadian (2024-25)", "⭐ OUA 1st Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:25, name:"Glen Cox", verified:true,                team:"Acadia",               year:"Y5", pos:"Guard",   ht:'6\'7"', wt:null,  sys:"Motion Offense",  pace:80.1, sos:0.75, stat:59.6, fit:50.4, elig:20,  demand:62.7, ctx:78,  ns:54.8, fit1:"Gonzaga",           fit1s:100.9, fit2:"Butler",           fit2s:95.7,  fit3:"Wake Forest",          fit3s:99.0 , ppg:21.1, rpg:7.7, apg:2.0, best:"21.1 PPG / 7.7 RPG (2024-25, Y5) — AUS 2nd Team All-Star" , fgp:49.2, tpp:20.0, ftp:61.0 , spg:0.9, bpg:0.2, tov:3.3, mpg:34.8, gp:18, gs:18, hometown:"Scotsburn", province:"NS", major:"Business", injury:null , verified:true , awards:["⭐ AUS 2nd Team All-Star (2024-25)", "⭐ AUS 1st Team All-Star (2023-24)"] , season:"2024-25"},
  { rank:26, name:"Charles Robert",          team:"Bishop's",             year:"Y3", pos:"Forward", ht:'6\'6"', wt:null,  sys:"Pick & Roll",     pace:71.0, sos:0.90, stat:57.6, fit:64.8, elig:60,  demand:29.3, ctx:84,  ns:54.7, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",     fit2s:84.4,  fit3:"Indiana",   fit3s:80.8,  ppg:15.8, rpg:5.2, apg:3.2, best:"15.8 PPG / 5.2 RPG / 3.2 APG (2024-25, Y3) — U SPORTS 1st Team All-Canadian, RSEQ Champion", fgp:50.0, tpp:33.3, ftp:58.9, spg:0.5, bpg:0.8, tov:3.1, mpg:30.2, gp:18, gs:18, hometown:"Vaudreuil-Dorion", province:"QC", major:"Mathematics", injury:null, verified:true, awards:["⭐ U SPORTS 1st Team All-Canadian (2024-25)", "🥈 U SPORTS National Silver Medal (2024-25)", "🏆 RSEQ Champion (2024-25)", "⭐ RSEQ 1st Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:30, name:"Étienne Gagnon",          team:"Bishop's",             year:"Y3", pos:"Forward", ht:'6\'7"', wt:210,   sys:"Pick & Roll",     pace:71.0, sos:0.90, stat:55.1, fit:64.8, elig:60,  demand:29.3, ctx:84,  ns:54.0, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",     fit2s:84.4,  fit3:"Indiana",   fit3s:80.8 , ppg:12.9, rpg:10.8, apg:0.8, best:"12.9 PPG / 10.8 RPG (2024-25, Y3) — led U SPORTS in rebounding; Bishop's" , fgp:46.9, tpp:30.6, ftp:72.2, spg:0.8, bpg:0.8, tov:1.6, mpg:29.1, gp:16, gs:16, hometown:"Longueuil", province:"QC", major:"Sociology", injury:null, verified:true, awards:["🏆 RSEQ Defensive Player of the Year (2024-25)", "⭐ RSEQ 1st Team All-Star (2024-25)", "🏆 RSEQ Champion (2024-25)", "🥈 U SPORTS National Silver Medal (2024-25)", "🌟 U SPORTS All-Rookie Team (2022-23)", "🏆 RSEQ Rookie of the Year (2022-23)"] , season:"2024-25"},
  { rank:31, name:"Dario Lopez",             team:"UFV",                  year:"Y3", pos:"Forward", ht:'6\'3"', wt:null,  sys:"Isolation / P&R", pace:79.0, sos:0.80, stat:48.2, fit:70.5, elig:60,  demand:29.3, ctx:69,  ns:52.1, fit1:"Marquette",          fit1s:106.2, fit2:"Ole Miss",         fit2s:99.6,  fit3:"Georgetown",   fit3s:98.4 , ppg:18.4, rpg:7.3, apg:1.8, best:"18.4 PPG / 7.3 RPG / 1.8 APG (2024-25, Y3) — CW 2nd Team All-Star; returned to UFV in 2025-26 (13 GP, 15.2 PPG)" , fgp:45.6, tpp:27.6, ftp:70.8 , spg:1.3, bpg:0.3, tov:2.4, mpg:30.7, gp:20, gs:20, hometown:"Abbotsford", province:"BC", major:"Business", injury:null , verified:true , awards:["⭐ CW 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:34, name:"Eric Armstrong",           team:"Guelph",               year:"Y3", pos:"Forward", ht:'6\'5"', wt:210,   sys:"Halfcourt",       pace:74.5, sos:0.90, stat:41.2, fit:64.3, elig:60,  demand:29.3, ctx:92,  ns:50.3, fit1:"Western Michigan",  fit1s:89.6,  fit2:"Central Michigan", fit2s:87.5,  fit3:"South Carolina",            fit3s:96.6 , ppg:14.7, rpg:7.3, apg:2.3, best:"14.7 PPG / 7.3 RPG (2024-25, Y3) — 45.4% FG" , fgp:45.4, tpp:29.4, ftp:69.5 , spg:0.5, bpg:0.5, tov:2.7, mpg:28.7, gp:26, gs:26, hometown:"Guelph", province:"ON", major:"Business", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:35, name:"Koat Thomas",             team:"StFX",                 year:"Y3", pos:"Forward", ht:'6\'5"', wt:null,  sys:"Motion Offense",  pace:80.3, sos:0.75, stat:44.2, fit:52.3, elig:80,  demand:29.3, ctx:78,  ns:49.5, fit1:"St. John's",       fit1s:102.6, fit2:"Indiana",            fit2s:102.0, fit3:"Butler",                fit3s:95.3,  ppg:10.1, rpg:7.2, apg:0.9, best:"10.1 PPG / 5.5 RPG (2024-25, Y3)", fgp:46.8, tpp:12.1, ftp:53.5, spg:1.0, bpg:0.2, tov:2.2, mpg:28.2, gp:17, gs:17, hometown:"Brantford", province:"ON", major:"Human Kinetics", injury:null, verified:true, awards:["🌟 AUS All-Rookie Team (2024-25)"] , season:"2024-25"},
  { rank:39, name:"Harold Santacruz",        team:"Lakehead",             year:"Y4", pos:"Center",  ht:'6\'9"', wt:null,  sys:"Motion Offense",  pace:80.3, sos:1.00, stat:44.8, fit:50.9, elig:60,  demand:14.0, ctx:100, ns:44.9, fit1:"Illinois",          fit1s:110.2, fit2:"Indiana",          fit2s:99.0,  fit3:"Tennessee",    fit3s:98.1,  ppg:16.8, rpg:7.5, apg:2.5, best:"16.8 PPG / 7.5 RPG (2024-25, Y4) — OUA 1st Team All-Star; 55.2% FG", fgp:55.2, tpp:42.9, ftp:73.3, spg:0.5, bpg:0.9, tov:2.0, mpg:24.6, gp:21, gs:21, hometown:"Madrid", province:"Spain", major:"Commerce", injury:null, verified:true, awards:["⭐ OUA 1st Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:36, name:"Easton Thimm",            team:"Saskatchewan",         year:"Y2", pos:"Forward", ht:'6\'9"', wt:224,   sys:"Pick & Roll",     pace:72.0, sos:0.85, stat:40.3, fit:58.4, elig:80,  demand:29.3, ctx:69,  ns:49.1, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",      fit2s:84.4,  fit3:"Indiana",               fit3s:80.8 , ppg:13.7, rpg:10.4, apg:2.2, best:"13.7 PPG / 10.4 RPG (2024-25, Y2) — led OUA in rebounding; no 3-point attempts" , fgp:50.2, tpp:0.0, ftp:73.2, spg:1.2, bpg:0.3, tov:2.2, mpg:29.9, gp:21, gs:21, hometown:"Saskatoon", province:"SK", major:"Business", injury:null, verified:true, awards:["🏀 CEBL Draft Pick — SK Rattlers, 23rd Overall (2025)", "🏆 CW Rookie of the Year (2023-24)"] , season:"2024-25"},
  { rank:41, name:"Eliel Nsoseme",           team:"Saint Mary's",         year:"Y5", pos:"Center",  ht:'6\'9"', wt:220,   sys:"Motion Offense",  pace:77.0, sos:0.75, stat:62.3, fit:52.7, elig:20,  demand:14.0, ctx:78,  ns:44.0, fit1:"Indiana",           fit1s:108.0, fit2:"Tennessee",         fit2s:107.1, fit3:"Illinois",              fit3s:101.2,  ppg:13.5, rpg:11.6, apg:2.0, best:"13.5 PPG / 11.6 RPG / 3.5 BPG (2024-25, Y5) — AUS 2nd Team All-Star; graduated after 2024-25 season", fgp:49.8, tpp:null, ftp:62.0, spg:0.9, bpg:3.5, tov:1.8, mpg:28.5, gp:17, gs:17, hometown:"Kinshasa", province:"DRC", major:"Business", injury:null, verified:true, awards:["⭐ AUS 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:37, name:"Norm Burry",              team:"Memorial",             year:"Y4", pos:"Forward", ht:'6\'6"', wt:null,  sys:"Halfcourt",       pace:75.9, sos:0.75, stat:52.5, fit:52.0, elig:40,  demand:29.3, ctx:78,  ns:47.1, fit1:"Western Michigan",  fit1s:86.5,  fit2:"Central Michigan", fit2s:84.0,  fit3:"Wake Forest",            fit3s:95.0,  ppg:14.9, rpg:7.6, apg:1.6, best:"15.9 PPG / 7.6 RPG (2024-25, Y4) — AUS 2nd Team All-Star; 5× Academic All-Canadian; 4.0 GPA", fgp:37.4, tpp:32.5, ftp:61.5, spg:0.6, bpg:0.1, tov:1.4, mpg:33.4, gp:20, gs:20, hometown:"Grafton", province:"NB", major:"Kinesiology", injury:null, verified:true, awards:["⭐ AUS 2nd Team All-Star (2024-25)", "📚 5× U SPORTS Academic All-Canadian"] , season:"2024-25"},
  { rank:38, name:"Lennart Weber",             team:"Toronto",              year:"Y2", pos:"Center", ht:'6\'8"', wt:null,  sys:"Isolation / P&R", pace:73.9, sos:0.90, stat:27.3, fit:71.2, elig:80,  demand:14.0, ctx:92,  ns:46.5, fit1:"Kansas State",      fit1s:99.4,  fit2:"Maryland",         fit2s:98.7,  fit3:"Cincinnati",         fit3s:98.1 , ppg:13.1, rpg:8.9, apg:1.9, best:"13.1 PPG / 8.9 RPG (2024-25, Y2) — transferred to Bryant University (NCAA DI, NEC)" , fgp:51.1, tpp:22.5, ftp:64.1 , spg:0.7, bpg:1.3, tov:1.6, mpg:27.1, gp:22, gs:22, hometown:"Toronto", province:"ON", major:"Engineering", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:45, name:"Geoffrey James",          team:"Victoria",             year:"Y3", pos:"Forward", ht:'6\'5"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:31.6, fit:44.6, elig:60,  demand:29.3, ctx:73,  ns:41.0, fit1:"Memphis",           fit1s:94.0,  fit2:"Gonzaga",          fit2s:88.5,  fit3:"Wake Forest",               fit3s:95.0 , ppg:10.1, rpg:3.3, apg:2.1, best:"10.1 PPG / 3.3 RPG (2024-25, Y3) — 17 pts in national championship game; key contributor on national champion Victoria Vikes" , fgp:40.4, tpp:42.3, ftp:76.3, spg:1.5, bpg:0.0, tov:1.8, mpg:24.5, gp:26, gs:14, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null, verified:true, awards:["🏆 U SPORTS National Champion (2024-25)"] , season:"2024-25"},
  { rank:40, name:"Matteo Zagar",            team:"Western",              year:"Y4", pos:"Forward", ht:'6\'6"', wt:null,  sys:"Motion Offense",  pace:79.2, sos:0.90, stat:40.2, fit:51.5, elig:40,  demand:29.3, ctx:92,  ns:44.4, fit1:"Gonzaga",           fit1s:104.0, fit2:"Butler",           fit2s:99.5,  fit3:"Wake Forest",          fit3s:102.0 , ppg:13.1, rpg:7.4, apg:2.1, best:"13.1 PPG / 7.4 RPG (2024-25, Y4) — 57.5% FG" , fgp:57.5, tpp:33.3, ftp:71.4 , spg:2.2, bpg:0.2, tov:2.1, mpg:29.7, gp:21, gs:21, hometown:"London", province:"ON", major:"Kinesiology", injury:null , verified:true , awards:[] , season:"2024-25"},
  { rank:42, name:"Shadynn Smid",            team:"Victoria",             year:"Y3", pos:"Forward", ht:'6\'4"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:38.5, fit:44.6, elig:60,  demand:29.3, ctx:73,  ns:43.1, fit1:"Memphis",           fit1s:93.0,  fit2:"Gonzaga",          fit2s:87.5,  fit3:"Wake Forest",               fit3s:95.0 , ppg:11.3, rpg:6.3, apg:0.9, best:"11.3 PPG / 6.3 RPG (2024-25, Y3) — 61.3% FG; two-way forward integral to Victoria's title run" , fgp:61.3, tpp:30.0, ftp:70.8, spg:1.2, bpg:1.3, tov:1.3, mpg:23.0, gp:15, gs:15, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null, verified:true, awards:["🏆 U SPORTS National Champion (2024-25)", "⭐ CW 2nd Team All-Star (2024-25)"] , season:"2024-25"},
  { rank:43, name:"Ethan Boag",              team:"Victoria",             year:"Y2", pos:"Forward", ht:'6\'2"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:29.3, fit:44.6, elig:80,  demand:29.3, ctx:73,  ns:42.7, fit1:"Memphis",           fit1s:97.6,  fit2:"Gonzaga",          fit2s:91.3,  fit3:"Wake Forest",               fit3s:95.0 , ppg:12.9, rpg:5.2, apg:1.0, best:"12.9 PPG / 5.2 RPG (2024-25, Y2) — key contributor on national champion Victoria Vikes" , fgp:44.7, tpp:34.4, ftp:74.6 , spg:0.3, bpg:0.4, tov:1.8, mpg:24.0, gp:24, gs:24, hometown:"Victoria", province:"BC", major:"Business", injury:null , verified:true , awards:["🏆 U SPORTS National Champion (2024-25)", "🏅 U SPORTS Tournament All-Star (2024-25)"] , season:"2024-25"},
  { rank:44, name:"Jeff Ngandu",             team:"StFX",                 year:"Y3", pos:"Forward", ht:'6\'9"', wt:209,   sys:"Motion Offense",  pace:80.3, sos:0.75, stat:26.4, fit:52.3, elig:60,  demand:29.3, ctx:78,  ns:41.8, fit1:"St. John's",       fit1s:102.6, fit2:"Indiana",          fit2s:102.0, fit3:"Butler",       fit3s:95.3 , ppg:8.1,  rpg:8.5, apg:0.5, best:"8.1 PPG / 8.5 RPG / 2.3 BPG (2024-25, Y3) — AUS Defensive Player of the Year; returned to StFX in 2025-26 (13 GP, 3 GS)" , fgp:53.6, tpp:0.0, ftp:55.3, spg:0.3, bpg:2.3, tov:1.6, mpg:21.3, gp:16, gs:16, hometown:"Lubumbashi", province:"DRC", major:"Math", injury:null, verified:true, awards:["🏆 AUS Defensive Player of the Year (2024-25)", "⭐ AUS 1st Team All-Star (2024-25)"] , season:"2024-25"}]
// ── Past transfers: U SPORTS → NCAA alumni. Read-only reference. ────────────
const PAST_TRANSFERS = [
  { id:"past-001", name:"Nginyu Ngala",            from:"Laurentian (OUA)",  to:"Kansas",       conf:"Big 12", pos:"Guard",   uYear:"Y4", season:"2024-25", notes:"OUA All-Star → Big 12. One of the highest-profile U SPORTS → NCAA jumps in recent memory." },
  { id:"past-002", name:"Noah Otshudi",            from:"Western (OUA)",     to:"Marshall",     conf:"SBC",    pos:"Guard",   uYear:"Y4", season:"2024-25", notes:"OUA Guard → Sun Belt. Transferred after 2024-25 season." },
  { id:"past-003", name:"Xavier Spencer",          from:"Carleton (OUA)",    to:"UMass Lowell", conf:"AEC",    pos:"Guard",   uYear:"Y4", season:"2024-25", notes:"Carleton Ravens → America East. Transferred after 2024-25 season." },
  { id:"past-004", name:"Lennart Weber",           from:"Toronto (OUA)",     to:"Bryant",       conf:"NEC",    pos:"Forward", uYear:"Y2", season:"2024-25", notes:"Early transfer — Y2 big man. Center → NEC (Bryant). Strong rebounding profile." },
  { id:"past-005", name:"Javier Gilgeous-Glasgow", from:"TMU (OUA)",         to:"Troy",         conf:"SBC",    pos:"Guard",   uYear:"Y4", season:"2024-25", notes:"TMU Guard → Sun Belt. Transferred after 2024-25 season." },
];

const PLAYERS_2526 = [
  { rank:6, name:"Oliver Engen",            team:"Queen's",              year:"Y2", pos:"Guard",   ht:'6\'4"', wt:null,  sys:"Press System",    pace:86.8, sos:1.00, stat:79.6, fit:34.4, elig:80, demand:62.7, ctx:100, ns:65.8, fit1:"Memphis",           fit1s:91.8,  fit2:"Bucknell",          fit2s:88.0,  fit3:"Missouri",               fit3s:99.8 , ppg:19.9, rpg:4.2, apg:4.6, best:"19.9 PPG / 4.2 RPG / 4.6 APG (2025-26, Y2) — U SPORTS 2nd Team All-Canadian; Queen's" , fgp:52.8, tpp:29.7, ftp:80.6 , spg:1.3, bpg:0.2, tov:1.6, mpg:28.9, gp:31, gs:30, hometown:"Kingston", province:"ON", major:"Engineering", injury:null , verified:true , awards:["⭐ U SPORTS 2nd Team All-Canadian (2025-26)", "🏆 U SPORTS Rookie of the Year (2024-25)", "🏆 OUA Rookie of the Year (2024-25)"] , season:"2025-26", needsUpdate:false},
  
  
  { rank:18, name:"Aubrey Dorey-Havens",     team:"Carleton",             year:"Y4", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:73.0, sos:1.00, stat:61.2, fit:51.8, elig:40,  demand:62.7, ctx:100, ns:59.8, fit1:"Butler",            fit1s:102.5, fit2:"Gonzaga",          fit2s:97.5,  fit3:"Missouri",          fit3s:106.8,  ppg:14.7, rpg:3.2, apg:4.7, best:"14.7 PPG / 3.2 RPG / 4.7 APG (2025-26, Y4) — National Champion Carleton; tournament MVP; 35 pts gold medal game", fgp:43.3, tpp:38.6, ftp:76.2, spg:0.9, bpg:0.2, tov:2.0, mpg:29.9, gp:21, gs:21, hometown:"North Vancouver", province:"BC", major:"Business", injury:null, verified:true, awards:["🏆 U SPORTS National Champion (2025-26)", "🏅 Final 8 Tournament MVP (2025-26)", "⭐ OUA 2nd Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},
  
  { rank:16, name:"Alvin Icyogere",           team:"Nipissing",            year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Isolation / P&R", pace:76.4, sos:0.90, stat:41.2, fit:71.8, elig:60,  demand:62.7, ctx:92,  ns:60.5, fit1:"Maryland",           fit1s:113.7, fit2:"Marquette",        fit2s:103.6, fit3:"St. John's", fit3s:108.8 , ppg:10.3, rpg:4.1, apg:2.1, best:"10.3 PPG / 4.1 RPG (2025-26, Y3) — Nipissing" , fgp:35.7, tpp:28.1, ftp:82.9 , spg:0.7, bpg:0.2, tov:2.6, mpg:27.9, gp:19, gs:17, hometown:"Ottawa", province:"ON", major:"Health Sciences", injury:null , verified:true , awards:[] , season:"2025-26", needsUpdate:false},
  { rank:3, name:"Keon Baker",            team:"Ontario Tech",         year:"Y4", pos:"Guard",   ht:'6\'4"', wt:null,  sys:"Isolation / P&R", pace:74.7, sos:0.90, stat:84.0, fit:71.6, elig:40,  demand:62.7, ctx:92,  ns:70.9, fit1:"South Florida",     fit1s:95.0,  fit2:"St. John's",       fit2s:94.5,  fit3:"Boise State", fit3s:106.8 , ppg:20.9, rpg:6.0, apg:1.8, best:"20.9 PPG / 6.0 RPG (2025-26, Y4) — U SPORTS 1st Team All-Canadian; OUA scoring leader" , fgp:41.5, tpp:30.5, ftp:73.1 , spg:1.3, bpg:0.6, tov:2.6, mpg:30.8, gp:18, gs:18, hometown:"Oshawa", province:"ON", major:"Commerce", injury:null , verified:true , awards:["⭐ U SPORTS 1st Team All-Canadian (2023-24)", "⭐ OUA 2nd Team All-Star (2023-24)"] , season:"2025-26", needsUpdate:false},
  
  

  { rank:12, name:"Isaac Simon",             team:"Alberta",              year:"Y4", pos:"Guard",   ht:'6\'2"', wt:180,   sys:"Isolation / P&R", pace:72.5, sos:0.85, stat:62.8, fit:70.2, elig:40,  demand:62.7, ctx:73,  ns:62.7, fit1:"Marquette",         fit1s:112.6, fit2:"Seton Hall",       fit2s:105.5, fit3:"Maryland",        fit3s:104.7 , ppg:15.7, rpg:4.3, apg:4.0, best:"15.7 PPG / 4.3 RPG / 4.0 APG (2025-26, Y4) — Alberta" , fgp:46.9, tpp:28.7, ftp:71.1 , spg:1.1, bpg:0.2, tov:2.3, mpg:29.4, gp:23, gs:23, hometown:"Edmonton", province:"AB", major:"Business", injury:null , verified:true , awards:["⭐ CW 2nd Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:25, name:"Emmanuel Otong",          team:"Windsor",              year:"Y3", pos:"Forward", ht:'6\'6"', wt:null,  sys:"Isolation / P&R", pace:78.8, sos:1.00, stat:46.0, fit:70.6, elig:60,  demand:29.3, ctx:100, ns:54.0, fit1:"Marquette",          fit1s:106.2, fit2:"Ole Miss",    fit2s:99.6,  fit3:"Georgetown",        fit3s:98.4 , ppg:11.5, rpg:5.7, apg:1.7, best:"11.5 PPG / 5.7 RPG (2025-26, Y3) — Windsor; 24 blocks" , fgp:46.8, tpp:28.3, ftp:64.0 , spg:0.4, bpg:0.9, tov:1.9, mpg:27.3, gp:27, gs:27, hometown:"Windsor", province:"ON", major:"Kinesiology", injury:null , verified:true , awards:[] , season:"2025-26", needsUpdate:false},
  { rank:2, name:"D.J. Jackson", verified:true,            team:"StFX",                 year:"Y4", pos:"Guard",   ht:'6\'4"', wt:190,   sys:"Isolation / P&R", pace:80.3, sos:0.75, stat:90.0, fit:69.7, elig:40,  demand:62.7, ctx:78,  ns:71.1, fit1:"Maryland",           fit1s:113.7, fit2:"St. John's",             fit2s:108.8,  fit3:"Marquette",       fit3s:103.6 , ppg:22.5, rpg:6.5, apg:4.7, best:"22.5 PPG / 6.5 RPG / 4.7 APG (2025-26, Y4) — U SPORTS 1st Team All-Canadian; AUS Player of the Year" , fgp:40.7, tpp:28.3, ftp:82.9 , spg:1.9, bpg:0.4, tov:2.6, mpg:30.9, gp:19, gs:19, hometown:"Dartmouth", province:"NS", major:"Kinesiology", injury:null , verified:true , awards:["⭐ U SPORTS 1st Team All-Canadian (2025-26)", "🏆 AUS Player of the Year (2024-25)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)"] , season:"2025-26", needsUpdate:false},
  
  { rank:21, name:"Charles Robert",          team:"Bishop's",             year:"Y4", pos:"Forward", ht:'6\'6"', wt:null,  sys:"Pick & Roll",     pace:71.0, sos:0.90, stat:68.0, fit:64.8, elig:40,  demand:29.3, ctx:84,  ns:55.4, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",     fit2s:84.4,  fit3:"Indiana",   fit3s:80.8,  ppg:17.0, rpg:6.0, apg:3.7, best:"17.0 PPG / 6.0 RPG / 3.7 APG (2025-26, Y4) — U SPORTS 2nd Team All-Canadian; Bishop's finalist; 52.3% FG", fgp:52.3, tpp:35.5, ftp:52.4, spg:0.5, bpg:0.9, tov:2.7, mpg:28.7, gp:22, gs:22, hometown:"Vaudreuil-Dorion", province:"QC", major:"Mathematics", injury:null, verified:true, awards:["⭐ U SPORTS 2nd Team All-Canadian (2025-26)", "🥈 U SPORTS Silver Medal (2025-26)", "⭐ U SPORTS 1st Team All-Canadian (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:36, name:"Harold Santacruz",        team:"Lakehead",             year:"Y5", pos:"Center",  ht:'6\'9"', wt:null,  sys:"Motion Offense",  pace:80.3, sos:1.00, stat:67.2, fit:50.9, elig:40,  demand:14.0, ctx:100, ns:49.2, fit1:"Illinois",          fit1s:110.2, fit2:"Indiana",          fit2s:99.0,  fit3:"Tennessee",    fit3s:98.1,  ppg:22.3, rpg:9.1, apg:2.5, best:"22.3 PPG / 9.1 RPG (2025-26, Y5) — U SPORTS 1st Team All-Canadian; OUA scoring leader; 46.8% FG", fgp:46.8, tpp:31.3, ftp:74.3, spg:0.7, bpg:1.4, tov:2.5, mpg:32.2, gp:22, gs:22, hometown:"Madrid", province:"Spain", major:"Commerce", injury:null, verified:true, awards:["⭐ U SPORTS 1st Team All-Canadian (2025-26)", "⭐ OUA 1st Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:33, name:"Étienne Gagnon",          team:"Bishop's",             year:"Y4", pos:"Forward", ht:'6\'7"', wt:210,   sys:"Pick & Roll",     pace:71.0, sos:0.90, stat:48.8, fit:64.8, elig:40,  demand:29.3, ctx:84,  ns:49.7, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",     fit2s:84.4,  fit3:"Indiana",   fit3s:80.8 , ppg:12.2, rpg:10.2, apg:1.4, best:"12.2 PPG / 10.2 RPG (2025-26, Y4) — U SPORTS Defensive Player of the Year; Bishop's finalist; 55.1% FG" , fgp:55.1, tpp:33.3, ftp:71.4, spg:1.6, bpg:0.3, tov:2.1, mpg:27.6, gp:16, gs:16, hometown:"Longueuil", province:"QC", major:"Sociology", injury:null, verified:true, awards:["🏆 U SPORTS Defensive Player of the Year (2025-26)", "🥈 U SPORTS Silver Medal (2025-26)", "🏆 RSEQ Defensive Player of the Year (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:20, name:"Renoldo Robinson",        team:"Victoria",             year:"Y4", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:61.2, fit:44.6, elig:40,  demand:62.7, ctx:73,  ns:55.8, fit1:"Memphis",           fit1s:97.1,  fit2:"Gonzaga",          fit2s:90.8,  fit3:"Boston College",               fit3s:93.8 , ppg:14.0, rpg:4.9, apg:4.4, best:"14.0 PPG / 4.9 RPG / 4.4 APG (2025-26, Y4) — National Champion Victoria; 114 AST" , fgp:41.2, tpp:28.2, ftp:75.6 , spg:2.0, bpg:0.3, tov:2.3, mpg:24.9, gp:26, gs:17, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null , verified:true , awards:["🥉 U SPORTS Bronze Medal (2025-26)", "⭐ CW 1st Team All-Star (2024-25)", "🏆 U SPORTS National Champion (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:26, name:"Eric Armstrong",           team:"Guelph",               year:"Y4", pos:"Forward", ht:'6\'5"', wt:210,   sys:"Halfcourt",       pace:74.5, sos:0.90, stat:61.6, fit:64.3, elig:40,  demand:29.3, ctx:92,  ns:54.0, fit1:"Western Michigan",  fit1s:89.6,  fit2:"Central Michigan", fit2s:87.5,  fit3:"South Carolina",            fit3s:96.6 , ppg:15.4, rpg:6.7, apg:2.3, best:"15.4 PPG / 6.7 RPG (2025-26, Y4) — 47.8% FG" , fgp:47.8, tpp:31.6, ftp:76.9 , spg:1.0, bpg:0.7, tov:2.4, mpg:27.5, gp:27, gs:27, hometown:"Guelph", province:"ON", major:"Business", injury:null , verified:true , awards:[] , season:"2025-26", needsUpdate:false},
  { rank:14, name:"Jasha'jaun Downey",       team:"Saint Mary's",         year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:77.0, sos:0.75, stat:65.2, fit:52.7, elig:60,  demand:62.7, ctx:78,  ns:61.8, fit1:"Gonzaga",           fit1s:102.9, fit2:"Butler",           fit2s:102.7, fit3:"Missouri",          fit3s:106.8 , ppg:16.3, rpg:3.5, apg:2.5, best:"16.3 PPG / 3.5 RPG (2025-26, Y3) — Saint Mary's" , fgp:36.6, tpp:29.7, ftp:76.1 , spg:1.2, bpg:0.2, tov:2.1, mpg:28.4, gp:19, gs:17, hometown:"Halifax", province:"NS", major:"Health Sciences", injury:null , verified:true , awards:[] , season:"2025-26", needsUpdate:false},
  { rank:13, name:"Ryan Regault",            team:"Acadia",               year:"Y2", pos:"Guard",   ht:'6\'0"', wt:null,  sys:"Motion Offense",  pace:80.1, sos:0.75, stat:59.6, fit:50.4, elig:80, demand:62.7, ctx:78,  ns:62.0, fit1:"Buffalo",           fit1s:87.5,  fit2:"Bowling Green",    fit2s:84.0,  fit3:"Missouri",  fit3s:106.8 , ppg:14.9, rpg:4.8, apg:4.8, best:"14.9 PPG / 4.8 RPG / 4.8 APG (2025-26, Y2) — AUS Championship MVP; Acadia" , fgp:38.0, tpp:34.5, ftp:82.1, spg:1.3, bpg:0.1, tov:3.1, mpg:27.4, gp:20, gs:20, hometown:"Scarborough", province:"ON", major:"Law and Society", injury:null, verified:true, awards:["🏆 AUS Championship MVP (2025-26)", "🏆 AUS Rookie of the Year (2024-25)", "🌟 AUS All-Rookie Team (2024-25)"] , season:"2025-26", needsUpdate:false},
  
  { rank:23, name:"Easton Thimm",            team:"Saskatchewan",         year:"Y3", pos:"Forward", ht:'6\'9"', wt:224,   sys:"Pick & Roll",     pace:72.0, sos:0.85, stat:65.6, fit:58.4, elig:60,  demand:29.3, ctx:69,  ns:54.3, fit1:"St. John's",       fit1s:96.8,  fit2:"Kansas State",      fit2s:84.4,  fit3:"Indiana",               fit3s:80.8 , ppg:16.4, rpg:12.3, apg:2.5, best:"16.4 PPG / 12.3 RPG (2025-26, Y3) — CW RPG leader; 59.7% FG; no 3-point attempts" , fgp:59.7, tpp:0.0, ftp:75.9, spg:1.0, bpg:0.6, tov:2.7, mpg:32.3, gp:20, gs:20, hometown:"Saskatoon", province:"SK", major:"Business", injury:null, verified:true, awards:["🏀 CEBL Draft Pick — SK Rattlers, 23rd Overall (2025)", "🏆 CW Rookie of the Year (2023-24)"] , season:"2025-26", needsUpdate:false},
  
  { rank:7, name:"Kato Jaro",               team:"Winnipeg",             year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null,  sys:"Pick & Roll",     pace:74.0, sos:0.80, stat:70.4, fit:62.0, elig:60,  demand:62.7, ctx:69,  ns:65.0, fit1:"South Florida",     fit1s:93.0,  fit2:"St. John's",       fit2s:92.0,  fit3:"Boston College", fit3s:100.8,  ppg:17.6, rpg:3.8, apg:5.0, best:"17.6 PPG / 3.8 RPG / 5.0 APG (2025-26, Y3) — U SPORTS 2nd Team All-Canadian; Winnipeg; 95.0% FT", fgp:44.9, tpp:37.9, ftp:95.0, spg:2.7, bpg:0.5, tov:3.6, mpg:33.6, gp:12, gs:12, hometown:"Winnipeg", province:"MB", major:"Business Admin", injury:null, verified:true, awards:["⭐ U SPORTS 2nd Team All-Canadian (2025-26)", "⭐ CW 2nd Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:11, name:"Marcus Barnes",           team:"UNB",                  year:"Y4", pos:"Guard",   ht:'6\'3"', wt:null,  sys:"Motion Offense",  pace:74.0, sos:0.75, stat:76.8, fit:52.3, elig:40,  demand:62.7, ctx:78,  ns:62.8, fit1:"Indiana",           fit1s:114.0, fit2:"Butler",            fit2s:110.3, fit3:"Gonzaga",               fit3s:109.1,  ppg:19.2, rpg:4.0, apg:3.1, best:"19.2 PPG / 4.0 RPG (2025-26, Y4) — U SPORTS 2nd Team All-Canadian; DPOY nominee; UNB", fgp:36.7, tpp:28.0, ftp:77.0, spg:1.7, bpg:0.3, tov:2.0, mpg:31.3, gp:20, gs:20, hometown:"Kitchener", province:"ON", major:"Business Admin", injury:null, verified:true, awards:["⭐ U SPORTS 2nd Team All-Canadian (2025-26)", "⭐ AUS 2nd Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:43, name:"Geoffrey James",          team:"Victoria",             year:"Y4", pos:"Forward", ht:'6\'5"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:48.0, fit:44.6, elig:40,  demand:29.3, ctx:73,  ns:43.5, fit1:"Memphis",           fit1s:94.0,  fit2:"Gonzaga",          fit2s:88.5,  fit3:"Wake Forest",               fit3s:95.0 , ppg:12.0, rpg:4.8, apg:3.5, best:"12.0 PPG / 4.8 RPG / 3.5 APG (2025-26, Y4) — Final 8 All-Star; DPOY nominee; Victoria bronze" , fgp:40.7, tpp:33.8, ftp:82.1, spg:2.2, bpg:0.1, tov:1.5, mpg:28.3, gp:24, gs:24, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null, verified:true, awards:["🥉 U SPORTS Bronze Medal (2025-26)", "🏆 U SPORTS National Champion (2024-25)"] , season:"2025-26", needsUpdate:false},
  
  { rank:42, name:"Shadynn Smid",            team:"Victoria",             year:"Y4", pos:"Forward", ht:'6\'4"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:53.6, fit:44.6, elig:40,  demand:29.3, ctx:73,  ns:45.2, fit1:"Memphis",           fit1s:93.0,  fit2:"Gonzaga",          fit2s:87.5,  fit3:"Wake Forest",               fit3s:95.0 , ppg:13.4, rpg:5.6, apg:1.1, best:"13.4 PPG / 5.6 RPG (2025-26, Y4) — National Champion Victoria; 55.7% FG" , fgp:55.7, tpp:32.9, ftp:75.7, spg:1.2, bpg:0.7, tov:1.7, mpg:25.4, gp:26, gs:25, hometown:"Victoria", province:"BC", major:"Kinesiology", injury:null, verified:true, awards:["🥉 U SPORTS Bronze Medal (2025-26)", "🏆 U SPORTS National Champion (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:38, name:"Ethan Boag",              team:"Victoria",             year:"Y3", pos:"Forward", ht:'6\'2"', wt:null,  sys:"Transition",      pace:82.3, sos:0.85, stat:52.8, fit:44.6, elig:60,  demand:29.3, ctx:73,  ns:47.4, fit1:"Memphis",           fit1s:97.6,  fit2:"Gonzaga",          fit2s:91.3,  fit3:"Wake Forest",               fit3s:95.0 , ppg:13.9, rpg:5.2, apg:2.3, best:"13.9 PPG / 5.2 RPG (2025-26, Y3) — U SPORTS 1st Team All-Canadian; CW Player of the Year; National Champion Victoria" , fgp:44.6, tpp:33.3, ftp:74.5 , spg:0.7, bpg:0.5, tov:1.8, mpg:26.0, gp:26, gs:26, hometown:"Victoria", province:"BC", major:"Business", injury:null , verified:true , awards:["⭐ U SPORTS 1st Team All-Canadian (2025-26)", "🥉 U SPORTS Bronze Medal (2025-26)", "🏆 CW Player of the Year (2025-26)", "🏆 U SPORTS National Champion (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:40, name:"Koat Thomas",             team:"StFX",                 year:"Y4", pos:"Forward", ht:'6\'5"', wt:null,  sys:"Motion Offense",  pace:80.3, sos:0.75, stat:48.8, fit:52.3, elig:40,  demand:29.3, ctx:78,  ns:46.1, fit1:"St. John's",       fit1s:102.6, fit2:"Indiana",            fit2s:102.0, fit3:"Butler",                fit3s:95.3,  ppg:12.2, rpg:6.5, apg:2.1, best:"12.2 PPG / 6.5 RPG (2025-26, Y4) — StFX", fgp:47.6, tpp:25.0, ftp:57.4, spg:1.3, bpg:0.3, tov:2.5, mpg:31.4, gp:20, gs:20, hometown:"Brantford", province:"ON", major:"Human Kinetics", injury:null, verified:true, awards:["🌟 AUS All-Rookie Team (2024-25)"] , season:"2025-26", needsUpdate:false},
  { rank:39, name:"Dario Lopez",             team:"UFV",                  year:"Y4", pos:"Forward", ht:'6\'3"', wt:null,  sys:"Isolation / P&R", pace:79.0, sos:0.80, stat:40.0, fit:70.5, elig:40,  demand:29.3, ctx:69,  ns:47.3, fit1:"Marquette",          fit1s:106.2, fit2:"Ole Miss",         fit2s:99.6,  fit3:"Georgetown",   fit3s:98.4 , ppg:15.2, rpg:5.9, apg:2.2, best:"15.2 PPG / 5.9 RPG / 2.2 APG (2025-26, Y4) — 53.8% FG; UFV", fgp:53.8, tpp:32.0, ftp:76.9, spg:1.1, bpg:0.7, tov:2.4, mpg:27.1, gp:13, gs:13, hometown:"Abbotsford", province:"BC", major:"Business", injury:null, verified:true, awards:["⭐ CW 2nd Team All-Star (2024-25)"] , season:"2025-26", needsUpdate:false},

  // ── 2025-26 EXPANSION BATCH 1 ────────────────────────────────────────────


  // Kymani Pollard — Lethbridge, CW, G, Y3 | stat=(ppg21.8×0.3+rpg6.1×0.15+apg2.8×0.1+spg1.6×0.12+bpg0.0×0.05-tov3.0×0.08+fgp40.4×0.05+tpp28.5×0.03+ftp81.7×0.02)×SOS(0.80) ≈ 54.2 | fit~60 (CW scorer) | ns=(54.2×0.30)+(60×0.25)+(62.7×0.25)+((80×0.60+80×0.40)×0.20)=16.3+15.0+15.7+16.0=63.0
  { rank:17, name:"Kymani Pollard",        team:"Lethbridge",  year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null, sys:"Isolation / P&R", pace:78.0, sos:0.80, stat:54.2, fit:60.0, elig:60, demand:62.7, ctx:80, ns:60.5, fit1:"South Florida", fit1s:90.0, fit2:"St. John's", fit2s:89.0, fit3:"Boise State", fit3s:95.0, ppg:21.8, rpg:6.1, apg:2.8, best:"21.8 PPG / 6.1 RPG (2025-26, Y3) — #4 scorer U SPORTS; Lethbridge", fgp:40.4, tpp:28.5, ftp:81.7, spg:1.6, bpg:0.0, tov:3.0, mpg:30.4, gp:20, gs:20, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Lydell Husbands — Dalhousie, AUS, G, Y3 | stat≈45.2×0.75 | fit~58 | ns=(33.9×0.30)+(58×0.25)+(62.7×0.25)+((60×0.60+78×0.40)×0.20)=10.2+14.5+15.7+13.4=53.8
  { rank:27, name:"Lydell Husbands",       team:"Dalhousie",   year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Motion Offense",  pace:76.0, sos:0.75, stat:45.2, fit:58.0, elig:60, demand:62.7, ctx:78, ns:53.8, fit1:"Vermont",  fit1s:88.0, fit2:"Stony Brook", fit2s:85.0, fit3:"UMass Lowell", fit3s:82.0, ppg:12.3, rpg:6.9, apg:5.5, best:"12.3 PPG / 6.9 RPG / 5.5 APG (2025-26, Y3) — #2 steals U SPORTS (50); #4 assists U SPORTS; Dalhousie", fgp:34.6, tpp:25.0, ftp:63.9, spg:2.5, bpg:0.5, tov:3.4, mpg:29.9, gp:20, gs:19, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Devawn White — Saint Mary's, AUS, G/F, Y3 | stat≈38.0×0.75 | fit~50 | ns=(28.5×0.30)+(50×0.25)+(62.7×0.25)+((60×0.60+78×0.40)×0.20)=8.6+12.5+15.7+13.4=50.2  — bumped slightly for #1 steals
  { rank:30, name:"Devawn White",          team:"Saint Mary's", year:"Y3", pos:"Wing",    ht:'6\'4"', wt:null, sys:"Motion Offense",  pace:77.0, sos:0.75, stat:40.0, fit:52.0, elig:60, demand:46.0, ctx:78, ns:51.0, fit1:"Vermont", fit1s:87.0, fit2:"Stony Brook", fit2s:84.0, fit3:"UMass Lowell", fit3s:80.0, ppg:9.6, rpg:7.8, apg:1.7, best:"9.6 PPG / 7.8 RPG (2025-26, Y3) — #1 steals U SPORTS (51); Saint Mary's", fgp:43.0, tpp:42.4, ftp:63.2, spg:2.6, bpg:0.4, tov:1.5, mpg:26.8, gp:20, gs:19, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Jack Tunstill — Guelph, OUA, G/F, Y4 | stat≈58.8×1.00 | fit~62 | ns=(58.8×0.30)+(62×0.25)+(62.7×0.25)+((40×0.60+100×0.40)×0.20)=17.6+15.5+15.7+11.2=60.0
  { rank:19, name:"Jack Tunstill",         team:"Guelph",      year:"Y4", pos:"Wing",    ht:'6\'4"', wt:null, sys:"Motion Offense",  pace:74.5, sos:1.00, stat:58.8, fit:62.0, elig:40, demand:46.0, ctx:100, ns:57.4, fit1:"Buffalo", fit1s:90.0, fit2:"Vermont", fit2s:87.0, fit3:"Stony Brook", fit3s:85.0, ppg:13.8, rpg:6.6, apg:2.1, best:"13.8 PPG / 6.6 RPG (2025-26, Y4) — #4 steals U SPORTS (47); 52.4% FG; Guelph", fgp:52.4, tpp:32.5, ftp:72.6, spg:2.2, bpg:0.9, tov:2.0, mpg:26.1, gp:21, gs:21, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Jeremiah Kwarteng — York, OUA, G, Y3 | stat≈62.0×1.00 | fit~58 | ns=(62.0×0.30)+(58×0.25)+(62.7×0.25)+((60×0.60+100×0.40)×0.20)=18.6+14.5+15.7+13.6=62.4
  { rank:9, name:"Jeremiah Kwarteng",     team:"York",        year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Isolation / P&R", pace:76.0, sos:1.00, stat:62.0, fit:58.0, elig:60, demand:62.7, ctx:100, ns:64.0, fit1:"Buffalo", fit1s:91.0, fit2:"Vermont", fit2s:88.0, fit3:"Stony Brook", fit3s:85.0, ppg:19.7, rpg:4.0, apg:3.3, best:"19.7 PPG / 4.0 RPG (2025-26, Y3) — #3 steals U SPORTS (48); 128 FTA (#2 U SPORTS); York", fgp:38.4, tpp:29.3, ftp:70.7, spg:2.3, bpg:0.2, tov:3.2, mpg:30.7, gp:21, gs:21, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Milan John — Western, OUA, G, Y3 | stat≈62.5×1.00 | fit~65 | ns=(62.5×0.30)+(65×0.25)+(62.7×0.25)+((60×0.60+100×0.40)×0.20)=18.8+16.3+15.7+13.6=64.4
  { rank:5, name:"Milan John",            team:"Western",     year:"Y3", pos:"Guard",   ht:'6\'3"', wt:null, sys:"Motion Offense",  pace:79.2, sos:1.00, stat:62.5, fit:65.0, elig:60, demand:62.7, ctx:100, ns:65.9, fit1:"Marquette", fit1s:103.0, fit2:"Maryland", fit2s:100.0, fit3:"Indiana", fit3s:98.0, ppg:17.5, rpg:3.8, apg:4.0, best:"17.5 PPG / 3.8 RPG / 4.0 APG (2025-26, Y3) — 47 STL (#5 U SPORTS); 45.7% FG; Western", fgp:45.7, tpp:31.0, ftp:77.9, spg:2.0, bpg:0.3, tov:2.1, mpg:30.6, gp:23, gs:23, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false, statsVerified:true },

  // Ares Culley-Bremner — McMaster, OUA, F/C, Y4 | stat≈55.0×1.00 | fit~52 | ns=(55.0×0.30)+(52×0.25)+(29.3×0.25)+((40×0.60+100×0.40)×0.20)=16.5+13.0+7.3+11.2=48.0
  { rank:34, name:"Ares Culley-Bremner",   team:"McMaster",    year:"Y4", pos:"Forward", ht:'6\'7"', wt:null, sys:"Motion Offense",  pace:73.0, sos:1.00, stat:55.0, fit:52.0, elig:40, demand:29.3, ctx:100, ns:49.6, fit1:"Buffalo", fit1s:88.0, fit2:"Stony Brook", fit2s:84.0, fit3:"Vermont", fit3s:82.0, ppg:9.0, rpg:9.0, apg:2.5, best:"9.0 PPG / 9.0 RPG (2025-26, Y4) — #1 blocker U SPORTS (78 BLK); 50.9% FG; McMaster", fgp:50.9, tpp:33.3, ftp:35.0, spg:1.3, bpg:3.7, tov:2.6, mpg:30.5, gp:21, gs:19, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Brice Fandio — Laurentian, OUA, G, Y3 | stat≈72.0×1.00 | fit~62 | ns=(72.0×0.30)+(62×0.25)+(62.7×0.25)+((60×0.60+100×0.40)×0.20)=21.6+15.5+15.7+13.6=66.4
  { rank:4, name:"Brice Fandio",          team:"Laurentian",  year:"Y3", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Isolation / P&R", pace:76.0, sos:1.00, stat:72.0, fit:62.0, elig:60, demand:62.7, ctx:100, ns:68.0, fit1:"Buffalo", fit1s:92.0, fit2:"Vermont", fit2s:89.0, fit3:"UMass Lowell", fit3s:86.0, ppg:19.6, rpg:3.1, apg:5.1, best:"19.6 PPG / 3.1 RPG / 5.1 APG (2025-26, Y3) — #12 steals U SPORTS (41); #6 assists U SPORTS (108); 86.9% FT; Laurentian", fgp:41.4, tpp:31.8, ftp:86.9, spg:2.0, bpg:0.0, tov:3.1, mpg:31.0, gp:21, gs:21, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Tye Cotie — Western, OUA, F/C, Y4 | stat≈44.0×1.00 | fit~52 | ns=(44.0×0.30)+(52×0.25)+(29.3×0.25)+((40×0.60+100×0.40)×0.20)=13.2+13.0+7.3+11.2=44.7
  { rank:44, name:"Tye Cotie",             team:"Western",     year:"Y4", pos:"Center",  ht:'6\'8"', wt:null, sys:"Motion Offense",  pace:79.2, sos:1.00, stat:44.0, fit:52.0, elig:40, demand:14.0, ctx:100, ns:42.5, fit1:"Illinois", fit1s:105.0, fit2:"Indiana", fit2s:99.0, fit3:"Tennessee", fit3s:97.0, ppg:9.5, rpg:6.5, apg:1.6, best:"9.5 PPG / 6.5 RPG (2025-26, Y4) — 68.1% FG (#1 U SPORTS); 25 BLK; Western", fgp:68.1, tpp:null, ftp:57.4, spg:0.8, bpg:1.1, tov:1.2, mpg:21.1, gp:23, gs:22, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false, statsVerified:true },

  // Owen Urquhart — Western, OUA, F, Y3 | stat≈36.0×1.00 | fit~50 | ns=(36.0×0.30)+(50×0.25)+(29.3×0.25)+((60×0.60+100×0.40)×0.20)=10.8+12.5+7.3+13.6=44.2
  { rank:41, name:"Owen Urquhart",         team:"Western",     year:"Y3", pos:"Forward", ht:'6\'7"', wt:null, sys:"Motion Offense",  pace:79.2, sos:1.00, stat:36.0, fit:50.0, elig:60, demand:29.3, ctx:100, ns:45.8, fit1:"Illinois", fit1s:103.0, fit2:"Indiana", fit2s:97.0, fit3:"Tennessee", fit3s:95.0, ppg:7.5, rpg:4.7, apg:2.6, best:"7.5 PPG / 4.7 RPG / 1.4 BPG (2025-26, Y3) — 65.4% FG (#2 U SPORTS); 1.4 BPG; Western", fgp:65.4, tpp:null, ftp:60.0, spg:0.7, bpg:1.4, tov:1.0, mpg:16.3, gp:21, gs:2, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false, statsVerified:true },

  // Ismael Konate — Laurentian, OUA, F/C, Y3 | stat≈54.0×1.00 | fit~50 | ns=(54.0×0.30)+(50×0.25)+(29.3×0.25)+((60×0.60+100×0.40)×0.20)=16.2+12.5+7.3+13.6=49.6
  { rank:29, name:"Ismael Konate",         team:"Laurentian",  year:"Y3", pos:"Forward", ht:'6\'8"', wt:null, sys:"Isolation / P&R", pace:76.0, sos:1.00, stat:54.0, fit:50.0, elig:60, demand:29.3, ctx:100, ns:51.2, fit1:"Illinois", fit1s:104.0, fit2:"Indiana", fit2s:99.0, fit3:"Tennessee", fit3s:97.0, ppg:11.2, rpg:10.3, apg:0.7, best:"11.2 PPG / 10.3 RPG (2025-26, Y3) — #4 rebounds U SPORTS; 99 offensive reb (#1 U SPORTS); Laurentian", fgp:43.0, tpp:25.9, ftp:78.7, spg:0.9, bpg:0.6, tov:1.5, mpg:26.3, gp:22, gs:21, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Chris-Evrard Malonga — Nipissing, OUA, F/C, Y3 | stat≈52.0×1.00 | fit~50 | ns=(52.0×0.30)+(50×0.25)+(29.3×0.25)+((60×0.60+100×0.40)×0.20)=15.6+12.5+7.3+13.6=49.0
  { rank:31, name:"Chris-Evrard Malonga",  team:"Nipissing",   year:"Y3", pos:"Forward", ht:'6\'7"', wt:null, sys:"Isolation / P&R", pace:76.4, sos:1.00, stat:52.0, fit:50.0, elig:60, demand:29.3, ctx:100, ns:50.6, fit1:"Illinois", fit1s:102.0, fit2:"Indiana", fit2s:97.0, fit3:"Tennessee", fit3s:95.0, ppg:12.3, rpg:7.5, apg:1.0, best:"12.3 PPG / 7.5 RPG (2025-26, Y3) — 58.8% FG; 32 BLK; Nipissing", fgp:58.8, tpp:28.6, ftp:57.4, spg:0.4, bpg:1.6, tov:1.6, mpg:25.8, gp:20, gs:17, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Kevin Toth — TMU, OUA, G, Y3 | stat≈30.0×1.00 | fit~58 | ns=(30.0×0.30)+(58×0.25)+(62.7×0.25)+((60×0.60+100×0.40)×0.20)=9.0+14.5+15.7+13.6=52.8
  { rank:22, name:"Kevin Toth",            team:"Toronto Metropolitan", year:"Y3", pos:"Guard", ht:'6\'1"', wt:null, sys:"Isolation / P&R", pace:76.4, sos:1.00, stat:30.0, fit:58.0, elig:60, demand:62.7, ctx:100, ns:54.4, fit1:"Vermont", fit1s:85.0, fit2:"Buffalo", fit2s:83.0, fit3:"UMass Lowell", fit3s:80.0, ppg:6.9, rpg:4.0, apg:5.5, best:"6.9 PPG / 4.0 RPG / 5.5 APG (2025-26, Y3) — #2 assists U SPORTS (120); Final 8 participant; TMU", fgp:31.6, tpp:25.0, ftp:70.8, spg:0.7, bpg:0.2, tov:2.7, mpg:25.0, gp:22, gs:18, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Chakib Sedoud — Laval, RSEQ, G, Y2 | stat≈55.0×0.90 | fit~68 | ns=(49.5×0.30)+(68×0.25)+(62.7×0.25)+((80×0.60+92×0.40)×0.20)=14.9+17.0+15.7+16.2=63.8 — note only 10 GP
  { rank:10, name:"Chakib Sedoud",         team:"Laval",       year:"Y2", pos:"Guard",   ht:'6\'4"', wt:null, sys:"Isolation / P&R", pace:71.0, sos:0.90, stat:55.0, fit:68.0, elig:80, demand:62.7, ctx:92, ns:63.8, fit1:"Maryland", fit1s:98.0, fit2:"Marquette", fit2s:95.0, fit3:"St. John's", fit3s:92.0, ppg:16.4, rpg:6.6, apg:1.3, best:"16.4 PPG / 6.6 RPG (2025-26, Y2) — #1 FT% U SPORTS (91.2%); #2 3PT% U SPORTS (48.6%); 53.2% FG; Laval (10 GP)", fgp:53.2, tpp:48.6, ftp:91.2, spg:0.8, bpg:0.3, tov:2.8, mpg:26.1, gp:10, gs:10, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Chris Sagl — Lakehead, OUA, G, Y5 | stat≈42.0×1.00 | fit~55 | ns=(42.0×0.30)+(55×0.25)+(62.7×0.25)+((20×0.60+100×0.40)×0.20)=12.6+13.8+15.7+10.4=52.5
  { rank:28, name:"Chris Sagl",            team:"Lakehead",    year:"Y5", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Motion Offense",  pace:80.3, sos:1.00, stat:42.0, fit:55.0, elig:20, demand:62.7, ctx:100, ns:52.5, fit1:"Vermont", fit1s:87.0, fit2:"Buffalo", fit2s:85.0, fit3:"UMass Lowell", fit3s:82.0, ppg:14.5, rpg:2.4, apg:6.1, best:"14.5 PPG / 2.4 RPG / 6.1 APG (2025-26, Y5) — #1 assists U SPORTS (135); 81.1% FT; Lakehead", fgp:35.6, tpp:30.4, ftp:81.1, spg:1.3, bpg:0.0, tov:2.7, mpg:31.3, gp:22, gs:22, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Ryan Gallagher — Victoria, CW, G, Y4 | stat≈32.0×0.85 | fit~58 | ns=(27.2×0.30)+(58×0.25)+(62.7×0.25)+((40×0.60+73×0.40)×0.20)=8.2+14.5+15.7+10.6=49.0
  { rank:37, name:"Ryan Gallagher",        team:"Victoria",    year:"Y4", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Transition",      pace:82.3, sos:0.85, stat:32.0, fit:58.0, elig:40, demand:62.7, ctx:73, ns:49.0, fit1:"Gonzaga", fit1s:91.0, fit2:"Memphis", fit2s:88.0, fit3:"Wake Forest", fit3s:86.0, ppg:7.3, rpg:2.0, apg:1.2, best:"7.3 PPG (2025-26, Y4) — #1 3PT% U SPORTS (53.4%); 55.2% FG; 26 GP Victoria", fgp:55.2, tpp:53.4, ftp:14.3, spg:0.4, bpg:0.1, tov:0.8, mpg:15.8, gp:26, gs:4, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Jakub Dobiech — Queen's, OUA, G, Y2 | stat≈42.0×1.00 | fit~62 | ns=(42.0×0.30)+(62×0.25)+(62.7×0.25)+((80×0.60+100×0.40)×0.20)=12.6+15.5+15.7+17.6=61.4
  { rank:15, name:"Jakub Dobiech",         team:"Queen's",     year:"Y2", pos:"Guard",   ht:'6\'3"', wt:null, sys:"Motion Offense",  pace:75.0, sos:1.00, stat:42.0, fit:62.0, elig:80, demand:62.7, ctx:100, ns:61.4, fit1:"Buffalo", fit1s:90.0, fit2:"Vermont", fit2s:87.0, fit3:"Stony Brook", fit3s:84.0, ppg:10.6, rpg:2.0, apg:1.3, best:"10.6 PPG / 2.0 RPG (2025-26, Y2) — #3 3PT% U SPORTS (46.8%); 49.7% FG; Queen's", fgp:49.7, tpp:46.8, ftp:80.0, spg:0.2, bpg:0.0, tov:1.1, mpg:18.2, gp:22, gs:5, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Mohamed Keita — Laval, RSEQ, C, Y3 | stat≈38.0×0.90 | fit~48 | ns=(34.2×0.30)+(48×0.25)+(14.0×0.25)+((60×0.60+92×0.40)×0.20)=10.3+12.0+3.5+14.7=40.5
  { rank:45, name:"Mohamed Keita",         team:"Laval",       year:"Y3", pos:"Center",  ht:'6\'9"', wt:null, sys:"Isolation / P&R", pace:71.0, sos:0.90, stat:38.0, fit:48.0, elig:60, demand:14.0, ctx:92, ns:40.5, fit1:"Illinois", fit1s:103.0, fit2:"Indiana", fit2s:98.0, fit3:"Tennessee", fit3s:96.0, ppg:5.1, rpg:7.0, apg:0.2, best:"5.1 PPG / 7.0 RPG (2025-26, Y3) — #5 blocks U SPORTS (31); 65.9% FG; Laval (13 GP)", fgp:65.9, tpp:null, ftp:60.0, spg:0.5, bpg:2.4, tov:1.1, mpg:17.8, gp:13, gs:9, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Owen Smith — UPEI, AUS, G, Y2 | stat≈40.0×0.75 | fit~55 | ns=(30.0×0.30)+(55×0.25)+(62.7×0.25)+((80×0.60+78×0.40)×0.20)=9.0+13.8+15.7+15.8=54.3
  { rank:24, name:"Owen Smith",            team:"UPEI",        year:"Y2", pos:"Guard",   ht:'6\'1"', wt:null, sys:"Motion Offense",  pace:76.0, sos:0.75, stat:40.0, fit:55.0, elig:80, demand:62.7, ctx:78, ns:54.3, fit1:"Vermont", fit1s:88.0, fit2:"Stony Brook", fit2s:85.0, fit3:"UMass Lowell", fit3s:83.0, ppg:11.4, rpg:2.3, apg:1.1, best:"11.4 PPG / 2.3 RPG (2025-26, Y2) — #2 FT% U SPORTS (90.2%); 36.7% 3PT; UPEI", fgp:41.6, tpp:36.7, ftp:90.2, spg:0.4, bpg:0.0, tov:0.8, mpg:19.6, gp:17, gs:4, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // Munroop Gill — Brandon, CW, G, Y1 | stat≈64.0×0.80 | fit~62 | ns=(51.2×0.30)+(62×0.25)+(62.7×0.25)+((100×0.60+69×0.40)×0.20)=15.4+15.5+15.7+17.5=64.1
  { rank:8, name:"Munroop Gill",          team:"Brandon",     year:"Y1", pos:"Guard",   ht:'6\'2"', wt:null, sys:"Isolation / P&R", pace:78.0, sos:0.80, stat:64.0, fit:62.0, elig:100, demand:62.7, ctx:69, ns:64.1, fit1:"South Florida", fit1s:91.0, fit2:"Boise State", fit2s:89.0, fit3:"St. John's", fit3s:87.0, ppg:17.9, rpg:3.9, apg:2.2, best:"17.9 PPG / 3.9 RPG (2025-26, Y1) — U SPORTS All-Rookie Team; 54.5% FG; 40.9% 3PT; Brandon", fgp:54.5, tpp:40.9, ftp:75.5, spg:2.3, bpg:0.1, tov:2.7, mpg:29.5, gp:18, gs:10, hometown:null, province:null, major:null, injury:null, verified:true, awards:["🌟 U SPORTS All-Rookie Team (2025-26)"], season:"2025-26", needsUpdate:false },

  // Luke Grace — Windsor, OUA, C/F, Y4 | stat≈58.0×1.00 | fit~52 | ns=(58.0×0.30)+(52×0.25)+(29.3×0.25)+((40×0.60+100×0.40)×0.20)=17.4+13.0+7.3+11.2=48.9
  { rank:32, name:"Luke Grace",            team:"Windsor",     year:"Y4", pos:"Forward", ht:'6\'8"', wt:null, sys:"Isolation / P&R", pace:78.8, sos:1.00, stat:58.0, fit:52.0, elig:40, demand:29.3, ctx:100, ns:50.5, fit1:"Illinois", fit1s:104.0, fit2:"Indiana", fit2s:99.0, fit3:"Tennessee", fit3s:97.0, ppg:16.6, rpg:9.3, apg:0.9, best:"16.6 PPG / 9.3 RPG (2025-26, Y4) — 56.0% FG; 207 total reb; Windsor", fgp:56.0, tpp:4.5, ftp:75.6, spg:1.4, bpg:0.4, tov:1.4, mpg:28.7, gp:27, gs:26, hometown:null, province:null, major:null, injury:null, verified:true, awards:[], season:"2025-26", needsUpdate:false },

  // ── 2025-26 NEW ADDITIONS ────────────────────────────────────────────────
  { rank:1, name:"Christophe Tshibola",    team:"Laval",                year:"Y1", pos:"Guard",   ht:'6\'2"', wt:190,   sys:"Isolation / P&R", pace:71.0, sos:0.90, stat:76.0, fit:70.8, elig:100, demand:62.7, ctx:92,  ns:75.5, fit1:"Maryland",         fit1s:95.7,  fit2:"Marquette",         fit2s:94.6,  fit3:"St. John's",      fit3s:90.8,  ppg:20.9, rpg:4.8, apg:3.5, best:"20.9 PPG / 4.8 RPG / 3.5 APG (2025-26, Y1) — U SPORTS Rookie of the Year; 1st Team All-Canadian; RSEQ MVP; first rookie to win conference MVP since 2001", fgp:45.9, tpp:31.3, ftp:81.6, spg:0.9, bpg:0.0, tov:2.7, mpg:31.4, gp:16, gs:16, hometown:"Montreal", province:"QC", major:"Sociology", injury:null, verified:true, awards:["🏆 U SPORTS Rookie of the Year (2025-26)", "⭐ U SPORTS 1st Team All-Canadian (2025-26)", "🏆 RSEQ Conference MVP (2025-26)", "🌟 U SPORTS All-Rookie Team (2025-26)"], season:"2025-26", needsUpdate:false},
  { rank:35, name:"Conner Landell",         team:"UNB",                  year:"Y2", pos:"Center",  ht:'6\'9"', wt:228,   sys:"Motion Offense",  pace:76.0, sos:0.75, stat:55.0, fit:52.5, elig:80,  demand:14.0, ctx:82,  ns:49.3, fit1:"Illinois",         fit1s:110.2, fit2:"Indiana",           fit2s:99.0,  fit3:"Tennessee",       fit3s:98.1,  ppg:11.8, rpg:11.6, apg:0.8, best:"11.8 PPG / 11.6 RPG (2025-26, Y2) — #2 rebounder in U SPORTS; 54.7% FG; CEBL draft pick (Brampton, 19th overall)", fgp:54.7, tpp:0.0, ftp:50.0, spg:0.3, bpg:1.1, tov:2.1, mpg:28.3, gp:20, gs:20, hometown:"Niagara Falls", province:"ON", major:"Arts", injury:null, verified:true, awards:["🏀 CEBL Draft Pick — Brampton Honey Badgers, 19th Overall (2025)"], season:"2025-26", needsUpdate:false},

  ];


const GLOSSARY_ITEMS = [
  // ── NORTHSCORE™ FORMULA ──────────────────────────────────────────────────
  { term:"NorthScore™",
    def:"Boreal's composite transfer prospect rating. Four components, each scored 0–100 and weighted:\n\n• Stat Score — 30% — SOS-adjusted scoring translation\n• Pace & System Fit — 25% — how well the player's U SPORTS system maps to NCAA targets\n• Positional Demand — 25% — open roster slots at target programs\n• Contextual Factors — 20% — eligibility years remaining + conference proximity + SOS tier bonus\n\nFinal scale: 0–100. Top Boreal prospects typically score 55–70. A score above 63 is elite.",
    section:"Formula" },
  { term:"Stat Score",
    def:"The statistical translation component of NorthScore™ (weight: 30%). Calculated as SOS-adjusted PPG, then normalised across all 125 tracked U SPORTS players so that 100 = best scorer in the pool and 0 = lowest. Accounts for conference difficulty by applying the SOS Multiplier to raw PPG before normalisation.",
    section:"Formula" },
  { term:"Pace & System Fit",
    def:"NorthScore™ component (weight: 25%). Measures how well a player's U SPORTS playing environment translates to each of the 30 NCAA target programs. Two sub-factors: pace differential (45% of this component) — how much faster or slower the NCAA program runs vs the player's U SPORTS team; and system tag compatibility (55%) — a matrix score based on how compatible the player's offensive system tag is with the target program's system.",
    section:"Formula" },
  { term:"Positional Demand",
    def:"NorthScore™ component (weight: 25%). Measures how many of the 30 Boreal target programs have open needs at the player's specific position, based on 2025-26 ESPN roster data and end-of-season departures projecting into 2026-27 availability.\n\nDemand scores (derived from roster analysis):\n• Guard: 62.7 — 164 open guard slots across 60 programs (2.73 avg/school)\n• Forward: 29.3 — 87 open forward slots (1.45 avg/school)\n• Wing: 46.0 — blended guard/forward demand\n• Center: 14.0 — 38 open center slots (0.70 avg/school)\n\nThe structural finding holds: guard demand is highest by a wide margin — roughly 2× forward and 4× center.",
    section:"Formula" },
  { term:"Contextual Factors",
    def:"NorthScore™ component (weight: 20%). Combines two sub-scores: Eligibility Score (60% of this component) — based on U SPORTS year (Y1=100, Y2=80, Y3=60, Y4=40, Y5=20); and Context Score (40%) — includes conference proximity bonus (OUA programs score higher for eastern US targets) and SOS tier bonus (higher-SOS conferences get a lift).",
    section:"Formula" },

  // ── STRENGTH OF SCHEDULE ─────────────────────────────────────────────────
  { term:"SOS Multiplier (U SPORTS)",
    def:"A conference-level strength-of-schedule adjustment Boreal applies to raw U SPORTS PPG before normalising the Stat Score. Reflects the relative quality of competition in each Canadian conference:\n\n• OUA Top-6 programs: 1.00× (full credit)\n• OUA Other + RSEQ: 0.90×\n• CW Top-4 programs: 0.85×\n• CW Other: 0.80×\n• AUS: 0.75×\n\nThis is a Boreal-internal metric — not the same as the KenPom SOS Net Rating.",
    section:"Strength of Schedule" },
  { term:"SOS Net Rating (KenPom)",
    def:"The KenPom strength of schedule metric for NCAA programs — expressed as the average adjusted net rating of a team's opponents. Appears in the Schools tab. A higher (more positive) number means a harder schedule. This is a different metric from Boreal's U SPORTS SOS Multiplier — same acronym, different calculation.",
    section:"Strength of Schedule" },

  // ── TRANSFER PORTAL ──────────────────────────────────────────────────────
  { term:"Transfer Portal Window",
    def:"The NCAA transfer portal has two open windows each year. Spring window: April 7 – April 21, 2026 — the primary window for U SPORTS players finishing their season. Fall window: a shorter secondary window in November. U SPORTS players must enter the portal and be cleared by the NCAA Eligibility Center before they can practice or compete.",
    section:"Transfer Portal" },
  { term:"NCAA Eligibility Center",
    def:"The NCAA body that reviews and certifies international transfer eligibility. U SPORTS players must submit transcripts and a course-by-course evaluation. Process typically takes 4–8 weeks. Boreal flags Y4 and Y5 players as time-sensitive given the shorter runway.",
    section:"Transfer Portal" },
  { term:"Grad Transfer",
    def:"A player who has completed their undergraduate degree and transfers to a new school. In the U SPORTS context, a Y5 player who has completed their degree qualifies as a grad transfer and receives one year of NCAA eligibility. The fastest path to immediate D1 eligibility with no restrictions.",
    section:"Transfer Portal" },
  { term:"Immediate Eligibility",
    def:"All transfer players in the current NCAA framework receive immediate eligibility — no sitting-out year required. This has significantly increased the volume of transfers and made the portal more attractive for U SPORTS players.",
    section:"Transfer Portal" },

  // ── CONFERENCE ABBREVIATIONS ─────────────────────────────────────────────
  { term:"OUA — Ontario University Athletics",
    def:"The largest and most competitive U SPORTS conference. Includes Carleton, Ottawa, Toronto Metropolitan, Queen's, Windsor, McMaster, Western, Laurier, Guelph, Waterloo, York, Brock, Nipissing, Algoma, Ontario Tech, UOIT. Top-6 OUA programs receive the highest SOS multiplier (1.00×) in Boreal's model.",
    section:"Conferences" },
  { term:"RSEQ — Réseau du sport étudiant du Québec",
    def:"Quebec's university sport network. Includes McGill, Concordia, Laval, UQAM, Bishop's. Shares the 0.90× SOS multiplier with mid-tier OUA in Boreal's model. Historically strong pipeline to eastern US programs.",
    section:"Conferences" },
  { term:"CW — Canada West",
    def:"Western Canada's U SPORTS conference. Includes Alberta, Calgary, Manitoba, Saskatchewan, Regina, Lethbridge, Fraser Valley (UFV), MacEwan, Mount Royal, Thompson Rivers, Brandon, Winnipeg, UBC, UBCO, Victoria, UNBC. Top-4 CW programs rated 0.85×; others 0.80× in Boreal's SOS model.",
    section:"Conferences" },
  { term:"AUS — Atlantic University Sport",
    def:"The smallest of the four U SPORTS conferences by competitive depth. Includes Dalhousie, Acadia, St. FX, Saint Mary's, UPEI, Memorial, Cape Breton, UNB, Lakehead (affiliate). AUS receives the lowest SOS multiplier (0.75×) in Boreal's model — this significantly discounts raw stats from AUS players.",
    section:"Conferences" },
  { term:"MAC — Mid-American Conference",
    def:"NCAA Division I conference and the single strongest conference for Canadian player representation. 16 Canadians across its programs in 2024-25. Boreal target schools: Buffalo, Akron, Bowling Green, Western Michigan, Central Michigan, Ohio. Strong border proximity to Ontario.",
    section:"Conferences" },
  { term:"AE — America East",
    def:"NCAA Division I conference and historically the most reliable mid-major conference for Canadian pipelines. Boreal target schools: Vermont, Maine, UMass Lowell, Albany, UMBC.",
    section:"Conferences" },
  { term:"A10 — Atlantic 10",
    def:"NCAA Division I mid-major conference with growing Canadian presence. Boreal target schools: St. Bonaventure, George Washington, Saint Louis.",
    section:"Conferences" },
  { term:"BE — Big East",
    def:"NCAA Division I high-major conference. Boreal target schools: St. John's, Butler. NYC/Chicago markets with access to Canadian talent and international recruiting infrastructure.",
    section:"Conferences" },
  { term:"B10 — Big Ten",
    def:"NCAA Division I Power conference. Boreal target schools: Illinois, Michigan. Realistic ceiling target for elite OUA prospects only (NorthScore 62+).",
    section:"Conferences" },
  { term:"WCC — West Coast Conference",
    def:"NCAA Division I conference and the top conference by Canadian scoring per player in 2024-25. Boreal target schools: Gonzaga, Santa Clara, Pacific.",
    section:"Conferences" },

  // ── OTHER METRICS ────────────────────────────────────────────────────────
  { term:"AdjT (KenPom)",
    def:"KenPom adjusted tempo — possessions per 40 minutes, adjusted for opponent pace. D1 average ~68.5. Boreal classification: Fast = 70+, Med-Fast = 68–70, Medium = 66–68, Slow = <66. Used to calculate pace differential in the Pace & System Fit score.\n\n⚠ Data vintage: 2024-25 season. Scheduled for refresh after the spring 2026 portal window closes (Apr 21).",
    section:"Metrics" },
  { term:"Net Rating",
    def:"KenPom adjusted net rating (ORtg − DRtg), opponent-adjusted. Positive = above average. Elite programs: +20 or higher. Mid-majors typically range from −15 to +10. Used in the Schools tab to assess program quality.\n\n⚠ Data vintage: 2024-25 season. Scheduled for refresh after the spring 2026 portal window closes (Apr 21).",
    section:"Metrics" },
  { term:"Fit Score",
    def:"Player-to-program compatibility score combining pace match, system tag alignment, and open slot demand. Shown for each player's top 3 NCAA fits in the detail panel. Scale is not capped at 100 — scores above 100 indicate exceptional multi-factor alignment.",
    section:"Metrics" },
  { term:"U Year (Y1–Y5)",
    def:"Year of U SPORTS eligibility. Y1 = Rookie · Y2 = Sophomore · Y3 = Junior · Y4 = Senior · Y5 = 5th Year. Directly determines NCAA eligibility years remaining and drives the Eligibility Score component of NorthScore™.",
    section:"Metrics" },
  { term:"System Tag",
    def:"7-tag taxonomy used by Boreal to classify offensive systems for both U SPORTS and NCAA programs: Transition · Press System · Motion Offense · Pick & Roll · Isolation / P&R · Halfcourt · Half & Half. The compatibility between a player's U SPORTS system tag and their target NCAA program's tag is the largest factor (55%) in the Pace & System Fit score.",
    section:"Metrics" },
  { term:"Tier",
    def:"Boreal's NCAA program classification. Tier 1 = High Major (Power conference equivalent) · Tier 2 = Strong Mid-Major · Tier 3 = Low Mid-Major / Conference target. Affects the contextual score component of NorthScore™.",
    section:"Metrics" },
  { term:"CA History",
    def:"Number of Canadians on a program's 2024-25 roster, sourced from Boreal internal research and basketballbuzz.ca. Reflects recent Canadian pipeline activity — programs that recruited Canadians in the last 1-2 seasons are more likely to do so again. Programs with 4+ Canadians are flagged as active pipelines.\n\nNote: This reflects 2024-25 roster data. A program with 0 CA does not mean no historical Canadian presence — it means no Canadians were rostered in that specific season.",
    section:"Metrics" },
  { term:"Open Slots",
    def:"Estimated number of roster spots opening at an NCAA program for the 2026-27 season — the target window for this portal cycle. Derived from graduating seniors, known portal departures, and eligibility expirations at the end of the 2025-26 season.\n\nHigher slot counts indicate programs with immediate roster need heading into the spring 2026 transfer portal window (April 7 – April 21). Does not yet reflect position-specific breakdowns — see the position bars on each school card for guard/forward/center need.",
    section:"Metrics" },
  { term:"Pipeline",
    def:"Boreal's recruiter tracking tool. Set a player's STATUS on their card (Watchlist → Shortlisted → Contacted → Offer Out → Verbal → Signed) and they automatically appear in the Pipeline tab. Per-player recruiting checklists, scout notes, and an activity log persist across sessions.\n\nThe Pipeline tab also archives Past Transfers — U SPORTS players who have already made the jump to NCAA D1, including Nginyu Ngala (Laurentian → Kansas), Noah Otshudi (Western → Marshall), Xavier Spencer (Carleton → UMass Lowell), Lennart Weber (Toronto → Bryant), and Javier Gilgeous-Glasgow (TMU → Troy).",
    section:"Metrics" }];

const ELIG_GUIDE = [
  { year:"Y1 — Rookie",      ncaa:"4 years remaining", score:100, color:"#00c853", note:"Full NCAA eligibility. Highest value prospect — 4 seasons to develop and contribute." },
  { year:"Y2 — 2nd Year",    ncaa:"3 years remaining", score:80,  color:"#69f0ae", note:"Strong window. 3 NCAA seasons gives programs meaningful return on investment." },
  { year:"Y3 — 3rd Year",    ncaa:"2 years remaining", score:60,  color:"#e6e6e6", note:"Solid mid-tier. Two seasons — programs can recruit for immediate impact." },
  { year:"Y4 — 4th Year",    ncaa:"1 year remaining",  score:40,  color:"#ff8a65", note:"One-year portal entry. Most common transfer profile. Impact-now players only." },
  { year:"Y5 — 5th Year",    ncaa:"Grad transfer only",score:20,  color:"#9e9e9e", note:"Grad transfer eligibility only. One year, immediate qualifier. Rarest window." }];

// ─── NCAA TARGET SCHOOLS ──────────────────────────────────────────────────────

const NCAA_SCHOOLS = [
  { name:"Illinois",         conf:"B10",  w:22, l:13, net:+24.32, ortg:121.9, drtg:97.6,  adjt:71.5, pace:"Fast",     sys:"Motion Offense",  tier:1, ca:6, kp:17,  slots:3, coach:"Brad Underwood",   tenure:8,  pos:[7,4,2], need:[2,2,1] },
  { name:"Michigan",         conf:"B10",  w:27, l:10, net:+23.45, ortg:116.5, drtg:93.1,  adjt:70.1, pace:"Fast",     sys:"Pick & Roll",     tier:1, ca:8, kp:21,  slots:4, coach:"Dusty May",         tenure:1,  pos:[9,4,2], need:[4,1,0] },
  { name:"St. John's",       conf:"BE",   w:31, l:5,  net:+26.06, ortg:114.0, drtg:88.0,  adjt:70.0, pace:"Fast",     sys:"Iso / P&R",       tier:1, ca:5, kp:14,  slots:3, coach:"Rick Pitino",       tenure:2,  pos:[8,6,0], need:[1,3,0] },
  { name:"Gonzaga",          conf:"WCC",  w:26, l:9,  net:+28.01, ortg:124.7, drtg:96.7,  adjt:70.5, pace:"Fast",     sys:"Motion Offense",  tier:1, ca:7, kp:8,   slots:3, coach:"Mark Few",           tenure:26, pos:[7,5,1], need:[3,3,0] },
  { name:"Butler",           conf:"BE",   w:15, l:20, net:+10.54, ortg:117.2, drtg:106.7, adjt:68.0, pace:"Med-Fast", sys:"Motion Offense",  tier:1, ca:4, kp:75,  slots:5, coach:"Thad Matta",         tenure:3,  pos:[7,4,1], need:[3,1,0] },
  { name:"Memphis",          conf:"Amer", w:29, l:6,  net:+15.10, ortg:113.4, drtg:98.3,  adjt:71.0, pace:"Fast",     sys:"Transition",      tier:1, ca:6, kp:54,  slots:5, coach:"Penny Hardaway",    tenure:7,  pos:[7,6,2], need:[4,2,1] },
  { name:"UCF",              conf:"B12",  w:20, l:17, net:+11.95, ortg:116.0, drtg:104.1, adjt:72.2, pace:"Fast",     sys:"Transition",      tier:2, ca:3, kp:67,  slots:4, coach:"Johnny Dawkins",    tenure:6,  pos:[6,4,3], need:[3,2,0] },
  { name:"Missouri",         conf:"SEC",  w:25, l:10, net:+20.10, ortg:118.4, drtg:98.2,  adjt:70.2, pace:"Fast",     sys:"Pick & Roll",     tier:2, ca:6, kp:36,  slots:4, coach:"Dennis Gates",       tenure:3,  pos:[8,5,1], need:[3,2,0] },
  { name:"Boise State",      conf:"MWC",  w:26, l:10, net:+18.50, ortg:117.2, drtg:99.0,  adjt:70.8, pace:"Fast",     sys:"Transition",      tier:2, ca:5, kp:43,  slots:4, coach:"Leon Rice",          tenure:15, pos:[7,5,2], need:[3,2,1] },
  { name:"Pittsburgh",       conf:"ACC",  w:21, l:14, net:+14.20, ortg:114.8, drtg:100.6, adjt:69.8, pace:"Med-Fast", sys:"Motion Offense",  tier:2, ca:5, kp:52,  slots:4, coach:"Jeff Capel",         tenure:7,  pos:[8,4,2], need:[3,2,1] },
  { name:"San Diego State",  conf:"MWC",  w:22, l:11, net:+16.40, ortg:109.8, drtg:93.6,  adjt:67.4, pace:"Slow",     sys:"Halfcourt",       tier:2, ca:5, kp:48,  slots:3, coach:"Brian Dutcher",     tenure:8,  pos:[8,4,2], need:[2,3,1] },
  { name:"South Carolina",   conf:"SEC",  w:18, l:15, net:+12.30, ortg:112.6, drtg:100.4, adjt:68.9, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:5, kp:63,  slots:5, coach:"Lamont Paris",      tenure:3,  pos:[8,4,2], need:[3,2,1] },
  { name:"Wake Forest",      conf:"ACC",  w:18, l:15, net:+9.60,  ortg:112.4, drtg:102.8, adjt:68.2, pace:"Fast",     sys:"Transition",      tier:2, ca:4, kp:81,  slots:4, coach:"Steve Forbes",       tenure:5,  pos:[7,5,2], need:[3,3,0] },
  { name:"Ole Miss",         conf:"SEC",  w:19, l:15, net:+11.80, ortg:113.2, drtg:101.5, adjt:69.1, pace:"Fast",     sys:"Transition",      tier:2, ca:4, kp:70,  slots:5, coach:"Chris Beard",        tenure:3,  pos:[7,5,2], need:[4,2,1] },
  { name:"Nevada",           conf:"MWC",  w:20, l:14, net:+9.20,  ortg:111.4, drtg:102.2, adjt:69.5, pace:"Med-Fast", sys:"Pick & Roll",     tier:2, ca:4, kp:88,  slots:5, coach:"Steve Alford",       tenure:4,  pos:[7,4,3], need:[3,2,1] },
  { name:"Boston College",   conf:"ACC",  w:17, l:16, net:+8.40,  ortg:110.2, drtg:101.8, adjt:68.5, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:89,  slots:5, coach:"Earl Grant",         tenure:4,  pos:[7,4,3], need:[3,2,1] },
  { name:"George Washington",conf:"A10",  w:21, l:13, net:+3.39,  ortg:107.1, drtg:103.7, adjt:67.4, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:128, slots:4, coach:"Jose Fernandez",    tenure:9,  pos:[7,3,2], need:[3,1,2] },
  { name:"UAB",              conf:"Amer", w:24, l:13, net:+6.70,  ortg:116.3, drtg:109.6, adjt:69.5, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:99,  slots:4, coach:"Andy Kennedy",      tenure:3,  pos:[7,4,1], need:[3,2,1] },
  { name:"South Florida",    conf:"Amer", w:13, l:19, net:-2.84,  ortg:103.6, drtg:106.5, adjt:68.5, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:3, kp:196, slots:5, coach:"Bryan Hodgson",     tenure:9,  pos:[7,4,1], need:[2,1,1] },
  { name:"Pacific",          conf:"WCC",  w:9,  l:24, net:-10.36, ortg:101.5, drtg:111.8, adjt:66.6, pace:"Medium",   sys:"Iso / P&R",       tier:2, ca:6, kp:284, slots:6, coach:"Dave Smart",        tenure:2,  pos:[7,2,2], need:[2,0,2] },
  { name:"Bucknell",         conf:"PL",   w:18, l:15, net:-3.20,  ortg:105.8, drtg:109.0, adjt:67.8, pace:"Med",      sys:"Motion Offense",  tier:2, ca:3, kp:215, slots:4, coach:"John Griffin III",  tenure:2,  pos:[7,4,2], need:[3,2,1] },
  { name:"American",         conf:"PL",   w:22, l:13, net:+2.40,  ortg:108.4, drtg:106.0, adjt:68.5, pace:"Fast",     sys:"Transition / P&R",tier:2, ca:2, kp:238, slots:4, coach:"Duane Simpkins",    tenure:2,  pos:[7,3,2], need:[3,1,1] },
  { name:"Boston University",conf:"PL",   w:16, l:16, net:-5.80,  ortg:103.1, drtg:105.2, adjt:67.2, pace:"Med",      sys:"Halfcourt",       tier:2, ca:3, kp:291, slots:4, coach:"Joe Jones",          tenure:9,  pos:[7,4,2], need:[2,2,1] },
  { name:"Buffalo",          conf:"MAC",  w:16, l:17, net:-4.32,  ortg:99.1,  drtg:103.4, adjt:72.7, pace:"Fast",     sys:"Transition",      tier:3, ca:9, kp:149, slots:4, coach:"George Halcovage",  tenure:2,  pos:[9,2,1], need:[3,1,1] },
  { name:"Akron",            conf:"MAC",  w:28, l:7,  net:+6.47,  ortg:113.6, drtg:107.1, adjt:71.7, pace:"Fast",     sys:"Transition",      tier:3, ca:3, kp:100, slots:3, coach:"John Groce",         tenure:4,  pos:[7,4,1], need:[3,2,0] },
  { name:"Bowling Green",    conf:"MAC",  w:14, l:18, net:-10.68, ortg:99.2,  drtg:109.8, adjt:68.9, pace:"Med-Fast", sys:"Iso / P&R",       tier:3, ca:5, kp:289, slots:5, coach:"Todd Simon",         tenure:2,  pos:[8,2,2], need:[3,1,1] },
  { name:"Western Michigan", conf:"MAC",  w:12, l:20, net:-10.70, ortg:101.7, drtg:112.4, adjt:68.0, pace:"Med-Fast", sys:"Halfcourt",       tier:3, ca:4, kp:290, slots:5, coach:"Dwayne Stephens",   tenure:5,  pos:[7,4,1], need:[4,3,0] },
  { name:"Central Michigan", conf:"MAC",  w:14, l:17, net:-2.85,  ortg:105.5, drtg:108.4, adjt:67.4, pace:"Med-Fast", sys:"Halfcourt",       tier:3, ca:5, kp:198, slots:4, coach:"Tony Barbee",        tenure:3,  pos:[8,3,1], need:[3,1,0] },
  { name:"Ohio",             conf:"MAC",  w:16, l:16, net:-2.81,  ortg:106.3, drtg:109.1, adjt:70.5, pace:"Fast",     sys:"Iso / P&R",       tier:3, ca:4, kp:195, slots:3, coach:"Jeff Boals",         tenure:7,  pos:[8,3,1], need:[4,1,1] },
  { name:"Vermont",          conf:"AE",   w:21, l:12, net:-6.32,  ortg:99.3,  drtg:105.6, adjt:62.6, pace:"Slow",     sys:"Motion Offense",  tier:3, ca:5, kp:242, slots:2, coach:"John Becker",        tenure:14, pos:[8,3,1], need:[3,1,1] },
  { name:"Maine",            conf:"AE",   w:20, l:14, net:-4.60,  ortg:100.1, drtg:104.7, adjt:66.2, pace:"Medium",   sys:"Halfcourt",       tier:3, ca:5, kp:219, slots:3, coach:"Chris Markwood",    tenure:5,  pos:[7,4,1], need:[3,1,0] },
  { name:"UMass Lowell",     conf:"AE",   w:17, l:15, net:-6.42,  ortg:108.7, drtg:115.1, adjt:68.8, pace:"Med-Fast", sys:"Iso / P&R",       tier:3, ca:4, kp:244, slots:4, coach:"Pat Duquette",      tenure:12, pos:[8,2,2], need:[4,1,1] },
  { name:"Albany",           conf:"AE",   w:17, l:16, net:-9.20,  ortg:103.3, drtg:112.5, adjt:67.7, pace:"Med-Fast", sys:"Halfcourt",       tier:3, ca:3, kp:275, slots:3, coach:"Dwayne Killings",   tenure:6,  pos:[8,3,1], need:[4,1,0] },
  { name:"Tennessee Tech",   conf:"OVC",  w:15, l:16, net:-0.80,  ortg:108.4, drtg:110.6, adjt:67.3, pace:"Med",      sys:"Motion / P&R",   tier:3, ca:2, kp:168, slots:4, coach:"John Pelphrey",     tenure:3,  pos:[6,4,2], need:[3,1,1] },

  // ── BIG EAST EXPANSION ───────────────────────────────────────────────────
  { name:"UConn",            conf:"BE",   w:26, l:9,  net:+22.10, ortg:116.8, drtg:94.2,  adjt:71.2, pace:"Fast",     sys:"Motion Offense",  tier:1, ca:5, kp:5,   slots:3, coach:"Dan Hurley",       tenure:7,  pos:[8,5,1], need:[2,2,0] },
  { name:"Creighton",        conf:"BE",   w:25, l:10, net:+18.40, ortg:118.6, drtg:100.2, adjt:70.4, pace:"Fast",     sys:"Motion Offense",  tier:1, ca:4, kp:22,  slots:4, coach:"Greg McDermott",   tenure:15, pos:[8,4,1], need:[3,2,0] },
  { name:"Marquette",        conf:"BE",   w:19, l:16, net:+12.30, ortg:113.4, drtg:101.0, adjt:69.8, pace:"Med-Fast", sys:"Iso / P&R",       tier:1, ca:4, kp:29,  slots:4, coach:"Shaka Smart",      tenure:2,  pos:[8,5,1], need:[3,2,0] },
  { name:"Xavier",           conf:"BE",   w:21, l:12, net:+14.60, ortg:115.2, drtg:100.8, adjt:69.5, pace:"Fast",     sys:"Motion Offense",  tier:1, ca:4, kp:44,  slots:4, coach:"Sean Miller",       tenure:2,  pos:[7,5,2], need:[3,2,1] },
  { name:"Villanova",        conf:"BE",   w:18, l:14, net:+11.20, ortg:114.8, drtg:103.6, adjt:68.8, pace:"Med-Fast", sys:"Motion Offense",  tier:1, ca:4, kp:50,  slots:4, coach:"Kyle Neptune",      tenure:3,  pos:[7,4,2], need:[3,2,0] },
  { name:"Providence",       conf:"BE",   w:12, l:20, net:+4.20,  ortg:108.6, drtg:104.4, adjt:67.6, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:60,  slots:5, coach:"Kim English",       tenure:2,  pos:[7,4,2], need:[3,2,1] },
  { name:"Seton Hall",       conf:"BE",   w:7,  l:24, net:-2.10,  ortg:104.2, drtg:106.8, adjt:67.0, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:91,  slots:5, coach:"Shaheen Holloway",  tenure:3,  pos:[8,4,1], need:[4,2,1] },
  { name:"Georgetown",       conf:"BE",   w:17, l:15, net:+5.80,  ortg:108.4, drtg:102.6, adjt:68.2, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:88,  slots:5, coach:"Ed Cooley",         tenure:2,  pos:[8,4,2], need:[3,2,1] },
  { name:"DePaul",           conf:"BE",   w:14, l:18, net:+1.40,  ortg:106.8, drtg:105.4, adjt:67.8, pace:"Fast",     sys:"Transition",      tier:3, ca:3, kp:122, slots:5, coach:"Chris Holtmann",    tenure:2,  pos:[7,3,2], need:[4,2,1] },

  // ── BIG TEN EXPANSION ────────────────────────────────────────────────────
  { name:"Indiana",          conf:"B10",  w:22, l:12, net:+18.60, ortg:115.4, drtg:97.2,  adjt:70.8, pace:"Med-Fast", sys:"Motion Offense",  tier:1, ca:5, kp:30,  slots:4, coach:"Mike Woodson",      tenure:4,  pos:[8,4,2], need:[3,2,1] },
  { name:"Maryland",         conf:"B10",  w:23, l:11, net:+16.80, ortg:114.6, drtg:97.8,  adjt:70.2, pace:"Fast",     sys:"Iso / P&R",       tier:1, ca:5, kp:37,  slots:4, coach:"Kevin Willard",     tenure:3,  pos:[8,4,2], need:[3,2,1] },
  { name:"Rutgers",          conf:"B10",  w:16, l:16, net:+8.20,  ortg:108.2, drtg:100.4, adjt:68.4, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:5, kp:80,  slots:4, coach:"Steve Pikiell",     tenure:10, pos:[8,3,2], need:[3,2,1] },

  // ── ACC EXPANSION ────────────────────────────────────────────────────────
  { name:"Syracuse",         conf:"ACC",  w:21, l:14, net:+11.60, ortg:112.8, drtg:101.2, adjt:68.6, pace:"Med-Fast", sys:"Motion Offense",  tier:2, ca:6, kp:72,  slots:4, coach:"Adrian Autry",      tenure:2,  pos:[7,4,2], need:[3,2,1] },
  { name:"Louisville",       conf:"ACC",  w:18, l:14, net:+10.40, ortg:111.6, drtg:101.4, adjt:68.2, pace:"Fast",     sys:"Transition",      tier:2, ca:4, kp:78,  slots:5, coach:"Pat Kelsey",        tenure:2,  pos:[8,4,2], need:[4,2,1] },

  // ── SEC EXPANSION ────────────────────────────────────────────────────────
  { name:"Tennessee",        conf:"SEC",  w:27, l:9,  net:+22.40, ortg:116.0, drtg:93.8,  adjt:71.0, pace:"Med-Fast", sys:"Motion Offense",  tier:1, ca:4, kp:19,  slots:3, coach:"Rick Barnes",       tenure:10, pos:[8,4,2], need:[2,2,1] },
  { name:"Arkansas",         conf:"SEC",  w:22, l:13, net:+14.20, ortg:113.8, drtg:99.6,  adjt:70.0, pace:"Fast",     sys:"Transition",      tier:2, ca:5, kp:44,  slots:5, coach:"John Calipari",     tenure:1,  pos:[8,5,2], need:[3,2,1] },

  // ── BIG 12 EXPANSION ─────────────────────────────────────────────────────
  { name:"Cincinnati",       conf:"B12",  w:20, l:12, net:+13.60, ortg:112.4, drtg:98.8,  adjt:69.6, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:4, kp:58,  slots:4, coach:"Wes Miller",        tenure:3,  pos:[8,4,2], need:[3,2,1] },
  { name:"West Virginia",    conf:"B12",  w:17, l:15, net:+8.80,  ortg:109.6, drtg:101.2, adjt:68.8, pace:"Fast",     sys:"Transition",      tier:2, ca:3, kp:81,  slots:4, coach:"Darian DeVries",    tenure:1,  pos:[7,4,2], need:[3,2,1] },
  { name:"Kansas State",     conf:"B12",  w:24, l:11, net:+17.20, ortg:114.2, drtg:97.0,  adjt:70.2, pace:"Med-Fast", sys:"Pick & Roll",     tier:2, ca:4, kp:32,  slots:4, coach:"Jerome Tang",       tenure:3,  pos:[7,4,2], need:[3,2,1] },

  // ── ATLANTIC 10 EXPANSION ────────────────────────────────────────────────
  { name:"Dayton",           conf:"A10",  w:22, l:12, net:+8.60,  ortg:110.8, drtg:102.4, adjt:68.4, pace:"Med-Fast", sys:"Motion Offense",  tier:2, ca:4, kp:70,  slots:4, coach:"Anthony Grant",     tenure:8,  pos:[7,4,2], need:[3,2,1] },
  { name:"VCU",              conf:"A10",  w:24, l:10, net:+10.20, ortg:109.4, drtg:99.2,  adjt:69.0, pace:"Fast",     sys:"Transition",      tier:2, ca:3, kp:67,  slots:4, coach:"Mike Rhoades",      tenure:7,  pos:[7,4,2], need:[3,2,1] },
  { name:"Saint Louis",      conf:"A10",  w:23, l:10, net:+9.40,  ortg:110.2, drtg:100.8, adjt:68.6, pace:"Med-Fast", sys:"Iso / P&R",       tier:2, ca:3, kp:78,  slots:4, coach:"Josh Schertz",      tenure:3,  pos:[7,4,2], need:[3,2,1] },
  { name:"Davidson",         conf:"A10",  w:16, l:16, net:+2.80,  ortg:107.6, drtg:104.8, adjt:67.4, pace:"Fast",     sys:"Motion Offense",  tier:3, ca:3, kp:158, slots:4, coach:"Matt McKillop",     tenure:2,  pos:[7,3,2], need:[3,1,1] },

  // ── A10 FORWARD-HEAVY MID-MAJORS ─────────────────────────────────────────
  { name:"Rhode Island",     conf:"A10",  w:17, l:16, net:-1.20,  ortg:106.4, drtg:107.6, adjt:67.2, pace:"Med-Fast", sys:"Motion Offense",  tier:3, ca:3, kp:170, slots:4, coach:"Archie Miller",     tenure:3,  pos:[7,4,2], need:[3,2,1] },
  { name:"UMass",            conf:"A10",  w:14, l:18, net:-3.80,  ortg:104.2, drtg:107.8, adjt:66.8, pace:"Med-Fast", sys:"Motion Offense",  tier:3, ca:3, kp:185, slots:5, coach:"Frank Martin",      tenure:4,  pos:[7,4,2], need:[3,2,1] },
  { name:"Saint Joseph's",   conf:"A10",  w:11, l:21, net:-8.60,  ortg:101.8, drtg:110.4, adjt:66.4, pace:"Med-Fast", sys:"Pick & Roll",     tier:3, ca:3, kp:202, slots:5, coach:"Billy Lange",       tenure:5,  pos:[7,4,2], need:[3,3,1] },
  { name:"Fordham",          conf:"A10",  w:12, l:20, net:-9.40,  ortg:100.6, drtg:110.2, adjt:66.2, pace:"Med-Fast", sys:"Pick & Roll",     tier:3, ca:3, kp:220, slots:5, coach:"Keith Urgo",        tenure:3,  pos:[7,4,2], need:[3,3,1] },
];

// ─── STYLES & HELPERS ────────────────────────────────────────────────────────

const SYS_COLORS = {
  "Transition":"#1a6b3c","Transition / Press":"#0d4f2c","Press System":"#d4a017",
  "Motion Offense":"#1565c0","Pick & Roll":"#6a1b9a","Isolation / P&R":"#bf360c","Halfcourt":"#4e342e",
};
const YEAR_CFG = {
  Y1:{label:"Rookie",color:"#00c853",bg:"rgba(0,200,83,0.12)"},
  Y2:{label:"2nd Yr",color:"#69f0ae",bg:"rgba(105,240,174,0.1)"},
  Y3:{label:"3rd Yr",color:"#e6e6e6",bg:"rgba(230,230,230,0.08)"},
  Y4:{label:"4th Yr",color:"#ff8a65",bg:"rgba(255,138,101,0.1)"},
  Y5:{label:"5th Yr",color:"#9e9e9e",bg:"rgba(158,158,158,0.08)"},
};
const PACE_COLORS = { Fast:"#00e676", "Med-Fast":"#69f0ae", Medium:"#ff9800", Slow:"#ef5350" };
const TIER_COLORS = { 1:"#00e676", 2:"#4fc3f7", 3:"#9e9e9e" };
function nsColor(v,mode="dark"){ const T=THEMES[mode]; return v>=65?T.accent:v>=60?T.accentMid:v>=55?"#b9f6ca":v>=50?"#a8d5a2":T.textSecondary; }

function ScoreBar({value,max=100,color="#1a6b3c"}){
  const mode=useTheme(); const T=THEMES[mode];
  return <div style={{width:"100%",height:3,background:T.barTrack,borderRadius:2,overflow:"hidden"}}>
    <div style={{width:`${(value/max)*100}%`,height:"100%",background:color,borderRadius:2,transition:"width 0.5s ease"}}/>
  </div>;
}

function NorthScoreRing({value,size=68}){
  const mode=useTheme(); const T=THEMES[mode];
  const r=28,cx=34,cy=34,stroke=4,circ=2*Math.PI*r,dash=(value/100)*circ,col=nsColor(value,mode);
  return <svg width={size} height={size} style={{flexShrink:0}}>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.ringTrack} strokeWidth={stroke}/>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={col} strokeWidth={stroke} strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={circ/4} strokeLinecap="round" style={{filter:`drop-shadow(0 0 6px ${col}80)`}}/>
    <text x={cx} y={cy+1} textAnchor="middle" dominantBaseline="middle" fill={col} fontFamily="'DM Mono',monospace" fontSize={13} fontWeight="700">{value.toFixed(1)}</text>
  </svg>;
}

const CRM_DEFAULT = {status:"Watchlist",stars:0,notes:"",contactLog:[]};

function useCRM(playerRank, playerSeason="2025-26"){
  const key = `crm:${playerSeason}-${playerRank}`;
  const [crm, setCrmState] = useState(CRM_DEFAULT);
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        const r = (()=>{ try{ const _v=localStorage.getItem(key); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(r){
          const parsed = JSON.parse(r.value);
          if(!parsed.contactLog){
            parsed.contactLog = parsed.lastContact
              ? [{date:parsed.lastContact, method:parsed.method||"—", note:""}]
              : [];
            delete parsed.lastContact; delete parsed.method;
          }
          setCrmState({...CRM_DEFAULT,...parsed});
        }
      }catch(e){}
      setLoaded(true);
    })();
  },[playerRank, playerSeason]);

  const setCrm = async (updated) => {
    const next = {...crm,...updated};
    setCrmState(next);
    try{ localStorage.setItem(key,JSON.stringify(next)); }catch(e){}
  };

  const addContact = async (entry) => {
    const next = {...crm, contactLog:[entry,...crm.contactLog]};
    setCrmState(next);
    try{ localStorage.setItem(key,JSON.stringify(next)); }catch(e){}
  };

  const removeContact = async (idx) => {
    const log = crm.contactLog.filter((_,i)=>i!==idx);
    const next = {...crm, contactLog:log};
    setCrmState(next);
    try{ localStorage.setItem(key,JSON.stringify(next)); }catch(e){}
  };

  return [crm, setCrm, addContact, removeContact, loaded];
}

function CRMPanel({p}){
  const mode=useTheme(); const T=THEMES[mode];
  const [crm, setCrm, addContact, removeContact, loaded] = useCRM(p.rank, p.season||"2025-26");
  const [editNotes, setEditNotes] = useState(false);
  const [draftNotes, setDraftNotes] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);
  const [logDate, setLogDate] = useState(new Date().toISOString().slice(0,10));
  const [logMethod, setLogMethod] = useState("Email");
  const [logNote, setLogNote] = useState("");

  if(!loaded) return null;

  const lastContact = crm.contactLog && crm.contactLog.length > 0 ? crm.contactLog[0] : null;
  const statusColor = CRM_STATUS_COLORS[crm.status] || T.textMuted;

  const handleAddContact = () => {
    if(!logDate) return;
    addContact({date:logDate, method:logMethod, note:logNote});
    setLogNote(""); setShowLogForm(false);
  };

  return <div style={{background:T.bgCard,border:`1px solid rgba(26,107,60,0.3)`,borderRadius:8,padding:"12px 14px",marginTop:6}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accentText,letterSpacing:1.5}}>◈ RECRUITMENT TRACKER</div>
      {lastContact&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>Last: {lastContact.date} · {lastContact.method}</div>}
    </div>

    {/* Status + Interest */}
    <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:120}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1,marginBottom:4}}>STATUS</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {CRM_STATUS_OPTIONS.map(s=>{
            const active = crm.status===s;
            const c = CRM_STATUS_COLORS[s];
            return <button key={s} onClick={()=>{
              setCrm({status:s});
              if(window.__pipelineSync) window.__pipelineSync(p, s==="Pass"?null:s==="Watchlist"?"Watchlist":s);
            }} style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"3px 7px",borderRadius:4,border:`1px solid ${active?c:T.border}`,background:active?`${c}22`:"transparent",color:active?c:T.textFaint,cursor:"pointer",transition:"all 0.12s"}}>{s}</button>;
          })}
        </div>
      </div>
      <div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1,marginBottom:4}}>INTEREST</div>
        <div style={{display:"flex",gap:3}}>
          {[1,2,3,4,5].map(n=><button key={n} onClick={()=>setCrm({stars:crm.stars===n?0:n})} style={{background:"transparent",border:"none",cursor:"pointer",fontSize:11,color:n<=crm.stars?"#ffd700":T.textGhost,padding:0,lineHeight:1,transition:"color 0.12s"}}>★</button>)}
        </div>
      </div>
    </div>

    {/* Scout Notes */}
    <div style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1}}>SCOUT NOTES</div>
        {!editNotes&&<button onClick={()=>{setDraftNotes(crm.notes);setEditNotes(true);}} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:"transparent",border:`1px solid ${T.borderInput}`,borderRadius:4,color:T.textMuted,cursor:"pointer",padding:"1px 7px"}}>edit</button>}
      </div>
      {editNotes
        ? <div>
            <textarea value={draftNotes} onChange={e=>setDraftNotes(e.target.value)} rows={3} placeholder="Observations, fit notes, relationship context..." style={{width:"100%",boxSizing:"border-box",background:T.bgInput,border:`1px solid ${T.accentBorder}`,borderRadius:5,padding:"7px 9px",color:T.textPrimary,fontSize:13,fontFamily:"'DM Mono',monospace",outline:"none",resize:"vertical",lineHeight:1.6}}/>
            <div style={{display:"flex",gap:6,marginTop:5}}>
              <button onClick={()=>{setCrm({notes:draftNotes});setEditNotes(false);}} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:"rgba(26,107,60,0.25)",border:"1px solid rgba(26,107,60,0.45)",borderRadius:5,color:T.accent,cursor:"pointer",padding:"4px 12px"}}>Save</button>
              <button onClick={()=>setEditNotes(false)} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:"transparent",border:`1px solid ${T.border}`,borderRadius:5,color:T.textMuted,cursor:"pointer",padding:"4px 10px"}}>Cancel</button>
            </div>
          </div>
        : <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:crm.notes?T.textSecondary:T.textGhost,lineHeight:1.6,minHeight:28,background:T.bgChip,borderRadius:5,padding:"6px 9px",border:`1px solid ${T.borderHr}`,cursor:"pointer",whiteSpace:"pre-wrap"}} onClick={()=>{setDraftNotes(crm.notes);setEditNotes(true);}}>
            {crm.notes||"No notes yet — click to add..."}
          </div>
      }
    </div>

    {/* Contact Log */}
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1}}>CONTACT LOG {crm.contactLog&&crm.contactLog.length>0&&<span style={{color:T.accent}}>({crm.contactLog.length})</span>}</div>
        <button onClick={()=>setShowLogForm(v=>!v)} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:showLogForm?"rgba(26,107,60,0.2)":"transparent",border:`1px solid ${showLogForm?"rgba(26,107,60,0.45)":T.borderInput}`,borderRadius:4,color:showLogForm?T.accent:T.textMuted,cursor:"pointer",padding:"2px 8px"}}>+ Log Contact</button>
      </div>

      {showLogForm&&<div style={{background:T.bgInput,border:`1px solid ${T.accentBorder}`,borderRadius:6,padding:"10px",marginBottom:8}}>
        <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
          <input type="date" value={logDate} onChange={e=>setLogDate(e.target.value)} style={{background:T.bgCard,border:`1px solid ${T.borderInput}`,borderRadius:4,padding:"4px 7px",color:T.textPrimary,fontSize:13,outline:"none",fontFamily:"'DM Mono',monospace",colorScheme:mode==="dark"?"dark":"light",flex:1,minWidth:120}}/>
          <select value={logMethod} onChange={e=>setLogMethod(e.target.value)} style={{background:T.bgCard,border:`1px solid ${T.borderInput}`,borderRadius:4,padding:"4px 7px",color:T.textPrimary,fontSize:13,outline:"none",fontFamily:"'DM Mono',monospace",cursor:"pointer"}}>
            {["Email","Phone","Social","In Person","Agent","Video Call","Text"].map(o=><option key={o} value={o} style={{background:T.bgSelect}}>{o}</option>)}
          </select>
        </div>
        <textarea value={logNote} onChange={e=>setLogNote(e.target.value)} rows={2} placeholder="What was discussed? Any commitments made?" style={{width:"100%",boxSizing:"border-box",background:T.bgCard,border:`1px solid ${T.borderInput}`,borderRadius:4,padding:"5px 8px",color:T.textPrimary,fontSize:13,fontFamily:"'DM Mono',monospace",outline:"none",resize:"vertical",lineHeight:1.5,marginBottom:6}}/>
        <div style={{display:"flex",gap:5}}>
          <button onClick={handleAddContact} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:"rgba(26,107,60,0.25)",border:"1px solid rgba(26,107,60,0.45)",borderRadius:4,color:T.accent,cursor:"pointer",padding:"4px 12px"}}>Save Entry</button>
          <button onClick={()=>{setShowLogForm(false);setLogNote("");}} style={{fontFamily:"'DM Mono',monospace",fontSize:12,background:"transparent",border:`1px solid ${T.border}`,borderRadius:4,color:T.textMuted,cursor:"pointer",padding:"4px 10px"}}>Cancel</button>
        </div>
      </div>}

      {crm.contactLog&&crm.contactLog.length>0
        ? <div style={{display:"grid",gap:4,maxHeight:180,overflowY:"auto"}}>
            {crm.contactLog.map((entry,i)=>(
              <div key={i} style={{background:T.bgChip,border:`1px solid ${T.borderHr}`,borderRadius:5,padding:"6px 9px",display:"flex",gap:8,alignItems:"flex-start"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:entry.note?3:0}}>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,fontWeight:700}}>{entry.date}</span>
                    <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:3,padding:"1px 5px"}}>{entry.method}</span>
                  </div>
                  {entry.note&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textSecondary,lineHeight:1.5,marginTop:2}}>{entry.note}</div>}
                </div>
                <button onClick={()=>removeContact(i)} style={{background:"transparent",border:"none",color:T.textGhost,cursor:"pointer",fontSize:11,padding:"0 2px",flexShrink:0,lineHeight:1}} title="Remove">×</button>
              </div>
            ))}
          </div>
        : <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textGhost,textAlign:"center",padding:"10px 0"}}>No contacts logged yet.</div>
      }
    </div>
  </div>;
}


// ─── PLAYER CARD ─────────────────────────────────────────────────────────────

function PlayerCard({p,onClick,selected}){
  const mode=useTheme(); const T=THEMES[mode];
  const [crm, setCrm, , , crmLoaded] = useCRM(p.rank, p.season||"2025-26");
  const [statusOpen, setStatusOpen] = useState(false);
  const yc=YEAR_CFG[p.year]||YEAR_CFG.Y3; const sc=SYS_COLORS[p.sys]||"#555"; const isElite=p.ns>=63;
  const hasCRM = crmLoaded && crm.status !== "Watchlist";
  const crmColor = CRM_STATUS_COLORS[crm.status];
  const lastContact = crmLoaded && crm.contactLog && crm.contactLog.length > 0 ? crm.contactLog[0] : null;

  return <div onClick={()=>onClick(p)} style={{background:selected?"rgba(26,107,60,0.16)":T.bgCard,border:selected?"1px solid rgba(26,107,60,0.55)":`1px solid ${hasCRM?crmColor+"44":T.border}`,borderRadius:10,padding:"16px 18px",cursor:"pointer",transition:"all 0.18s",position:"relative",overflow:"hidden"}} onMouseEnter={e=>{if(!selected){e.currentTarget.style.background=T.bgCardHover;e.currentTarget.style.borderColor=T.borderMid;}}} onMouseLeave={e=>{if(!selected){e.currentTarget.style.background=T.bgCard;e.currentTarget.style.borderColor=hasCRM?crmColor+"44":T.border;}}}>
    {isElite&&<div style={{position:"absolute",top:0,right:0,width:3,height:"100%",background:"linear-gradient(180deg,#00e676,#1a6b3c)",borderRadius:"0 10px 10px 0"}}/>}
    <div style={{display:"flex",alignItems:"center",gap:10}}>
      <div style={{width:24,textAlign:"center",flexShrink:0}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textLabel,fontWeight:600}}>#{p.rank}</span></div>
      <NorthScoreRing value={p.ns}/>
      <div style={{flex:1,minWidth:0}}>

        {/* Row 1 — name + badges */}
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:p.unavailable?T.textMuted:T.textPrimary}}>{p.name}</span>
          {p.unavailable&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"1px 6px",borderRadius:3,background:"rgba(239,83,80,0.10)",color:"#ef5350",border:"1px solid rgba(239,83,80,0.3)",fontWeight:700,letterSpacing:0.5}}>⛔ {p.unavailable}</span>}
          {!p.unavailable&&(p.verified
            ?<span title="Verified" style={{fontSize:12,color:"#69f0ae",background:"rgba(105,240,174,0.12)",border:"1px solid rgba(105,240,174,0.3)",borderRadius:3,padding:"1px 4px",fontWeight:700,letterSpacing:0.5}}>✓ VRF</span>
            :<span title="Estimated" style={{fontSize:12,color:"#ffb74d",background:"rgba(255,183,77,0.08)",border:"1px solid rgba(255,183,77,0.25)",borderRadius:3,padding:"1px 4px",fontWeight:600,letterSpacing:0.5}}>EST</span>)}
          {p.awards&&p.awards.some(a=>a.startsWith("🏆"))&&<span style={{fontSize:13}}>🏆</span>}
          <span style={{fontSize:12,fontWeight:700,padding:"2px 5px",borderRadius:3,background:yc.bg,color:yc.color,border:`1px solid ${yc.color}28`,letterSpacing:0.5}}>{p.year}</span>
          {crm.stars>0&&<span style={{fontSize:12,color:"#ffd700",letterSpacing:-1}}>{"★".repeat(crm.stars)}</span>}
          {p.needsUpdate&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:11,padding:"1px 5px",borderRadius:3,background:"rgba(26,107,60,0.12)",color:"#69f0ae",border:"1px solid rgba(26,107,60,0.28)"}}>STATS PENDING</span>}
        </div>

        {/* Row 2 — team + system */}
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textTabInactive}}>{p.team}</span>
          <span style={{fontSize:12,padding:"1px 6px",borderRadius:3,background:`${sc}1e`,color:sc,border:`1px solid ${sc}40`}}>{p.sys}</span>
        </div>

        {/* Row 3 — phys + stats */}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#7dd3a8",fontWeight:600}}>{p.pos}</span>
          <span style={{width:1,height:8,background:T.textGhost,display:"inline-block"}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textSecondary}}>{p.ht}</span>
          {p.wt&&<><span style={{width:1,height:8,background:T.textGhost,display:"inline-block"}}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textMuted}}>{p.wt} lbs</span></>}
          {p.ppg&&<><span style={{width:1,height:8,background:T.textGhost,display:"inline-block"}}/><span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.accent,fontWeight:700}}>{p.ppg} PPG</span></>}
        </div>

        {/* Row 4 — status row: collapsed until tagged, shows active badge + expand trigger */}
        {/* Row 4 — status: collapsed until interacted, shows active badge or + Track */}
        <div style={{marginBottom:8}} onClick={e=>e.stopPropagation()}>
          {!statusOpen
            ? <div style={{display:"flex",alignItems:"center",gap:6}}>
                {hasCRM
                  ? <span onClick={()=>setStatusOpen(true)} style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"2px 8px",borderRadius:4,border:`1px solid ${crmColor}55`,background:`${crmColor}18`,color:crmColor,cursor:"pointer",letterSpacing:0.3}}>
                      {STATUS_CONFIG[crm.status]?.icon||"●"} {crm.status} <span style={{opacity:0.5,marginLeft:2}}>▾</span>
                    </span>
                  : <button onClick={()=>setStatusOpen(true)}
                      style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"2px 9px",borderRadius:4,border:`1px solid ${T.borderMid}`,background:"transparent",color:T.textGhost,cursor:"pointer",letterSpacing:0.3,transition:"all 0.12s"}}
                      onMouseEnter={e=>{e.currentTarget.style.color=T.textFaint;e.currentTarget.style.borderColor=T.textGhost;}}
                      onMouseLeave={e=>{e.currentTarget.style.color=T.textGhost;e.currentTarget.style.borderColor=T.borderMid;}}>
                      + Track
                    </button>
                }
              </div>
            : <div style={{display:"flex",alignItems:"center",gap:3,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:0.8,marginRight:2}}>STATUS</span>
                {CRM_STATUS_OPTIONS.map(s=>{
                  const active = crm.status===s;
                  const c = CRM_STATUS_COLORS[s];
                  return <button key={s} onClick={()=>{
                    setCrm({status:s});
                    if(window.__pipelineSync) window.__pipelineSync(p, s==="Pass"?null:s);
                    setStatusOpen(false);
                  }}
                    style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"2px 7px",borderRadius:4,border:`1px solid ${active?c:T.border}`,background:active?`${c}22`:"transparent",color:active?c:T.textFaint,cursor:"pointer",transition:"all 0.12s",lineHeight:1.4}}>
                    {s}
                  </button>;
                })}
                <button onClick={()=>setStatusOpen(false)} style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"2px 5px",borderRadius:4,border:`1px solid ${T.borderMid}`,background:"transparent",color:T.textGhost,cursor:"pointer",marginLeft:2}}>✕</button>
              </div>
          }
        </div>

        {/* Row 5 — last contact / notes preview */}
        {(lastContact||crm.notes)&&<div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8,paddingTop:4,borderTop:`1px solid ${T.borderHr}`}}>
          {lastContact&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>📞 {lastContact.date} · {lastContact.method}</span>}
          {crm.notes&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textGhost,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:180}}>· {crm.notes}</span>}
        </div>}

        {/* Row 6 — score bars */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3px 10px"}}>
          {[["Stat",p.stat,"#4fc3f7"],["Fit",p.fit,"#ce93d8"],["Elig",p.elig,T.accent],["Dmnd",p.demand,"#ff8a65"]].map(([l,v,c])=>(
            <div key={l}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:0.5}}>{l}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:c}}>{v.toFixed(0)}</span></div><ScoreBar value={v} color={c}/></div>
          ))}
        </div>

      </div>
    </div>
  </div>;
}

// ─── DETAIL PANEL ────────────────────────────────────────────────────────────

function DetailPanel({p,onClose,onCompare}){
  const mode=useTheme(); const T=THEMES[mode];
  if(!p) return null;
  const yc=YEAR_CFG[p.year]||YEAR_CFG.Y3; const sc=SYS_COLORS[p.sys]||"#555";
  const components=[
    {label:"Statistical Translation",key:"stat",color:"#4fc3f7",weight:"30%"},
    {label:"Pace & System Fit",key:"fit",color:"#ce93d8",weight:"25%"},
    {label:"Positional Demand",key:"demand",color:"#ff8a65",weight:"25%"},
    {label:"Eligibility + Context",key:"elig",color:T.accent,weight:"20%"}];
  return <div style={{background:T.bgPanel,border:`1px solid ${T.borderAccent}`,borderRadius:12,padding:"20px",backdropFilter:"blur(20px)",boxShadow:mode==="light"?"0 4px 24px rgba(0,0,0,0.08)":"none"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textLabel}}>#{p.rank} NORTHSCORE™</span>
          <span style={{fontSize:12,fontWeight:700,padding:"2px 6px",borderRadius:3,background:yc.bg,color:yc.color,border:`1px solid ${yc.color}28`}}>{p.year} · {yc.label}</span>
          {p.needsUpdate&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:11,letterSpacing:0.8,padding:"1px 6px",borderRadius:3,background:"rgba(26,107,60,0.12)",color:"#69f0ae",border:"1px solid rgba(26,107,60,0.28)"}}>STATS PENDING</span>}
        </div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:p.unavailable?T.textMuted:T.textPrimary,margin:"0 0 4px 0"}}>{p.name}</h2>
        {p.unavailable&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ef5350",background:"rgba(239,83,80,0.08)",border:"1px solid rgba(239,83,80,0.25)",borderRadius:5,padding:"4px 10px",marginBottom:6,display:"inline-block"}}>⛔ {p.unavailable}</div>}
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textSecondary}}>{p.team}</span>
          <span style={{fontSize:12,padding:"2px 7px",borderRadius:3,background:`${sc}1e`,color:sc,border:`1px solid ${sc}40`}}>{p.sys}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:12,background:T.accentBg,border:`1px solid ${T.accentBorder}`,borderRadius:8,padding:"7px 12px"}}>
          {[["POS",p.pos,"#7dd3a8"],["HT",p.ht,T.textPrimary],p.wt?["WT",`${p.wt} lbs`,T.textSecondary]:null,["PACE",p.pace,T.textSecondary],["SOS",`×${p.sos}`,T.textSecondary]].filter(Boolean).map(([l,v,c],i)=>(
            <React.Fragment key={l}>
              {i>0&&<div style={{width:1,height:24,background:T.border}}/>}
              <div style={{textAlign:"center"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:2}}>{l}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:c}}>{v}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        {p.ppg&&<div style={{display:"flex",alignItems:"center",gap:10,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 14px",marginTop:8}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginRight:4}}>{p.season||"2024-25"}</div>
          {p.verified?<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#69f0ae",letterSpacing:0.5,marginRight:4}}>✓ VERIFIED</span>:<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ff8a65",letterSpacing:0.5,marginRight:4}}>~ ESTIMATED</span>}
          {[["PPG",p.ppg,T.accent],["RPG",p.rpg,"#4fc3f7"],["APG",p.apg,"#ce93d8"]].map(([l,v,cv],i)=>(
            <React.Fragment key={l}>
              {i>0&&<div style={{width:1,height:20,background:T.border}}/>}
              <div style={{textAlign:"center",minWidth:36}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:1}}>{l}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,color:cv}}>{v}</div>
              </div>
            </React.Fragment>
          ))}
          {p.best&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,marginLeft:"auto",maxWidth:180,lineHeight:1.4}}>{p.best}</div>}
        </div>}
        {p.ppg&&<div style={{display:"flex",alignItems:"center",gap:10,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 14px",marginTop:6}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginRight:4}}>SHOOTING</div>
          {[["FG%",p.fgp,"#ff8a65"],["3PT%",p.tpp,"#ffe082"],["FT%",p.ftp,"#b9f6ca"]].map(([l,v,cv],i)=>(
            <React.Fragment key={l}>
              {i>0&&<div style={{width:1,height:20,background:T.border}}/>}
              <div style={{textAlign:"center",minWidth:40}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:1}}>{l}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,color:(v!=null&&v!==0)?cv:T.textFaint}}>{(v!=null&&v!==0)?`${v}%`:"—"}</div>
              </div>
            </React.Fragment>
          ))}
        </div>}
        {p.spg!=null&&<div style={{display:"flex",alignItems:"center",gap:10,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,padding:"7px 14px",marginTop:6}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginRight:4}}>DEFENCE</div>
          {[["SPG",p.spg,"#69f0ae"],["BPG",p.bpg,"#4fc3f7"],["TOV",p.tov,"#ff8a65"]].map(([l,v,cv],i)=>(
            <React.Fragment key={l}>
              {i>0&&<div style={{width:1,height:20,background:T.border}}/>}
              <div style={{textAlign:"center",minWidth:36}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:1}}>{l}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,color:cv}}>{v}</div>
              </div>
            </React.Fragment>
          ))}
          <div style={{width:1,height:20,background:T.border}}/>
          <div style={{textAlign:"center",minWidth:36}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:1}}>MPG</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,fontWeight:700,color:T.textSecondary}}>{p.mpg}</div>
          </div>
          <div style={{width:1,height:20,background:T.border}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.2,marginBottom:1}}>GP / GS</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:T.textSecondary}}>{p.gp}<span style={{color:T.textFaint,fontSize:11}}>/{p.gs}</span></div>
          </div>
        </div>}
        {p.awards&&p.awards.length>0&&<div style={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,padding:"9px 14px",marginTop:6}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginBottom:8}}>HONOURS & AWARDS</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {p.awards.map((award,i)=>{
              const isTrophy=award.startsWith("🏆");
              const isStar=award.startsWith("⭐");
              const isMedal=award.startsWith("🏅");
              const isChamp=award.startsWith("🥇");
              const bg=isTrophy?"rgba(255,215,0,0.1)":isStar?"rgba(100,181,246,0.1)":isMedal?"rgba(205,127,50,0.1)":"rgba(105,240,174,0.08)";
              const border=isTrophy?"rgba(255,215,0,0.35)":isStar?"rgba(100,181,246,0.3)":isMedal?"rgba(205,127,50,0.3)":"rgba(105,240,174,0.2)";
              const color=isTrophy?"#ffd700":isStar?"#64b5f6":isMedal?"#cd7f32":"#69f0ae";
              return <span key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:color,background:bg,border:`1px solid ${border}`,borderRadius:5,padding:"3px 8px",lineHeight:1.5}}>{award}</span>
            })}
          </div>
        </div>}
        {p.hometown&&<div style={{display:"flex",alignItems:"center",gap:10,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:8,padding:"9px 14px",marginTop:6,flexWrap:"wrap"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginRight:4}}>RECRUITING</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textPrimary,background:T.bgChip,border:`1px solid ${T.borderMid}`,borderRadius:5,padding:"2px 8px"}}>📍 {p.hometown}, {p.province}</span>
            {p.major&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textSecondary,background:T.bgChip,border:`1px solid ${T.borderMid}`,borderRadius:5,padding:"2px 8px"}}>🎓 {p.major}</span>}
            {p.injury&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#ff8a65",background:"rgba(255,138,101,0.08)",border:"1px solid rgba(255,138,101,0.25)",borderRadius:5,padding:"2px 8px"}}>⚠️ {p.injury}</span>}
            {!p.injury&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"#69f0ae",background:"rgba(105,240,174,0.08)",border:"1px solid rgba(105,240,174,0.2)",borderRadius:5,padding:"2px 8px"}}>✓ No injury flags</span>}
          </div>
        </div>}
        <CRMPanel p={p}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
        <NorthScoreRing value={p.ns}/>
        <div style={{display:"flex",gap:6}}>
          
          {onCompare&&<button onClick={()=>onCompare(p)} style={{background:"rgba(79,195,247,0.1)",border:"1px solid rgba(79,195,247,0.3)",borderRadius:7,color:"#4fc3f7",cursor:"pointer",padding:"5px 10px",fontSize:13,fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"}} onMouseEnter={e=>{e.target.style.background="rgba(79,195,247,0.2)";}} onMouseLeave={e=>{e.target.style.background="rgba(79,195,247,0.1)";}}>⚖ Compare</button>}
          <button onClick={onClose} style={{background:"transparent",border:`1px solid ${T.borderInput}`,borderRadius:7,color:T.textMuted,cursor:"pointer",padding:"5px 10px",fontSize:13,fontFamily:"'DM Mono',monospace"}}>✕</button>
        </div>
      </div>
    </div>
    <div style={{marginBottom:16}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.5,marginBottom:8}}>SCORE BREAKDOWN</div>
      <div style={{display:"grid",gap:7}}>
        {components.map(c=>(
          <div key={c.key} style={{background:T.bgCard,borderRadius:7,padding:"10px 12px",border:`1px solid ${T.borderHr}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div><span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:c.color,fontWeight:600}}>{c.label}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginLeft:7}}>wt. {c.weight}</span></div>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:c.color}}>{p[c.key].toFixed(1)}</span>
            </div>
            <ScoreBar value={p[c.key]} color={c.color}/>
          </div>
        ))}
      </div>
    </div>
    <div>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.5,marginBottom:8}}>TOP NCAA FITS</div>
      <div style={{display:"grid",gap:6}}>
        {[[1,p.fit1,p.fit1s],[2,p.fit2,p.fit2s],[3,p.fit3,p.fit3s]].map(([n,school,score])=>(
          <div key={n} style={{display:"flex",alignItems:"center",gap:12,background:T.bgCard,borderRadius:7,padding:"10px 14px",border:`1px solid ${T.borderHr}`}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint,width:14}}>#{n}</span>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:600,color:T.textPrimary,flex:1}}>{school}</span>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:700,color:n===1?T.accent:n===2?T.accentMid:"#b9f6ca"}}>{score.toFixed(1)}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:0.5}}>FIT</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>;
}

// ─── TAB COMPONENTS ──────────────────────────────────────────────────────────

function ProspectsTab({activePlayers,activeSeason,onCompare,eligYearFilter,onClearEligFilter}){
  const mode=useTheme(); const T=THEMES[mode];
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [selected,setSelected] = useState(null);
  const [search,setSearch] = useState("");
  const [filterYear,setFilterYear] = useState("ALL");
  const [filterPos,setFilterPos] = useState("ALL");
  const [filterSys,setFilterSys] = useState("ALL");
  const [filterCRM,setFilterCRM] = useState("ALL");
  const [sortBy,setSortBy] = useState("ns");

  // Reset selected player and CRM filter when season changes
  useEffect(()=>{ setSelected(null); setFilterYear("ALL"); setFilterPos("ALL"); setFilterSys("ALL"); setFilterCRM("ALL"); },[activeSeason]);

  // Apply year filter coming from EligibilityTab click
  useEffect(()=>{
    if(eligYearFilter){ setFilterYear(eligYearFilter); onClearEligFilter&&onClearEligFilter(); }
  },[eligYearFilter]);

  // Persist last-viewed player across sessions
  useEffect(()=>{
    (async()=>{
      try{
        const r = (()=>{ try{ const _v=localStorage.getItem("board:lastSelected"); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(r){
          const rank = JSON.parse(r.value);
          const p = activePlayers.find(p=>p.rank===rank);
          if(p) setSelected(p);
        }
      }catch(e){}
    })();
  },[]);

  // Load all CRM states for filtering (lightweight — just status field)
  const [crmStatuses, setCrmStatuses] = useState({});
  useEffect(()=>{
    (async()=>{
      const statuses = {};
      for(const p of activePlayers){
        const season = p.season||"2024-25";
        const lookupKey = `crm:${season}-${p.rank}`;
        const mapKey = `${season}-${p.rank}`;
        try{
          const r = (()=>{ try{ const _v=localStorage.getItem(lookupKey); return _v?{value:_v}:null; }catch(e){ return null; } })();
          if(r){ const d = JSON.parse(r.value); statuses[mapKey] = d.status||"Watchlist"; }
          else statuses[mapKey] = "Watchlist";
        }catch(e){ statuses[mapKey]="Watchlist"; }
      }
      setCrmStatuses(statuses);
    })();
  },[activeSeason]);

  const [exportMsg, setExportMsg] = useState("");

  const handleSelect=(p)=>{
    const next = selected?.rank===p.rank ? null : p;
    setSelected(next);
    try{ localStorage.setItem("board:lastSelected",JSON.stringify(next?.rank||null)); }catch(e){}
  };

  const [showCsvModal, setShowCsvModal] = useState(false);
  const [csvContent, setCsvContent] = useState("");

  const handleExportCSV = () => {
    const headers = ["Rank","Name","Team","Season","Year","Pos","Ht","Wt","PPG","RPG","APG","FG%","3PT%","GP","NS","Stat","Fit","Elig","Demand","SOS","Fit1","Fit1s","Fit2","Fit2s","Fit3","Fit3s","Verified"];
    const rows = filtered.map(p=>[
      p.rank, '"'+p.name+'"', '"'+p.team+'"', p.season||activeSeason, p.year, p.pos, p.ht, p.wt||"",
      p.ppg||"", p.rpg||"", p.apg||"", p.fgp||"", p.tpp||"", p.gp||"",
      p.ns.toFixed(1), p.stat.toFixed(1), p.fit.toFixed(1), p.elig.toFixed(1), p.demand.toFixed(1), p.sos||"",
      '"'+(p.fit1||"")+'"', p.fit1s?.toFixed(1)||"", '"'+(p.fit2||"")+'"', p.fit2s?.toFixed(1)||"", '"'+(p.fit3||"")+'"', p.fit3s?.toFixed(1)||"",
      p.verified?"Y":"N"
    ]);
    const csv = [headers.join(","), ...rows.map(r=>r.join(","))].join("\n");
    setCsvContent(csv);
    setShowCsvModal(true);
  };

  const handleCopyBoard = () => {
    const lines = filtered.map(p=>"#"+p.rank+" "+p.name+" — "+p.team+" · "+p.year+" · "+p.pos+" · NS "+p.ns.toFixed(1)+" · "+(p.ppg||"—")+" PPG · Fit: "+(p.fit1||"—"));
    const text = "BOREAL BOARD · "+activeSeason+" · "+new Date().toLocaleDateString("en-CA")+"\n\n" + lines.join("\n");
    try {
      navigator.clipboard.writeText(text).then(()=>{
        setExportMsg("Copied!"); setTimeout(()=>setExportMsg(""),2500);
      }).catch(()=>{ setCsvContent(text); setShowCsvModal(true); });
    } catch(e) { setCsvContent(text); setShowCsvModal(true); }
  };

  const filtered = useMemo(()=>{
    // Minimum threshold: ≥10 MPG and ≥5 PPG and ≥10 GP (insufficient sample / bench role filter)
    let list=activePlayers.filter(p=>(p.mpg||0)>=10 && (p.ppg||0)>=5 && (p.gp||0)>=10);
    if(search) list=list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.team.toLowerCase().includes(search.toLowerCase()));
    if(filterYear!=="ALL") list=list.filter(p=>p.year===filterYear);
    if(filterPos!=="ALL") list=list.filter(p=>filterPos==="Forward"?(p.pos==="Forward"||p.pos==="Wing"||p.pos==="Centre"):p.pos===filterPos);
    if(filterSys!=="ALL") list=list.filter(p=>p.sys===filterSys);
    if(filterCRM!=="ALL") list=list.filter(p=>(crmStatuses[(p.season||"2024-25")+"-"+p.rank]||"Watchlist")===filterCRM);
    list.sort((a,b)=>sortBy==="ns"?b.ns-a.ns:sortBy==="stat"?b.stat-a.stat:sortBy==="fit"?b.fit-a.fit:b.elig-a.elig);
    return list;
  },[activePlayers,search,filterYear,filterPos,filterSys,filterCRM,sortBy,crmStatuses]);

  const topNS=activePlayers.reduce((a,b)=>b.ns>a.ns?b:a,activePlayers[0]);
  const avgNS=(activePlayers.reduce((s,p)=>s+p.ns,0)/activePlayers.length).toFixed(1);

  return <div>
    {/* Historical season notice */}
    {activeSeason==="2024-25"&&<div style={{background:"rgba(26,107,60,0.07)",border:"1px solid rgba(26,107,60,0.25)",borderRadius:10,padding:"10px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:11}}>📋</span>
      <div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:700,color:T.accent,letterSpacing:1}}>HISTORICAL BOARD — 2024-25 SEASON</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accentMid,marginLeft:10,opacity:0.7}}>These players have completed their 2024-25 season. Some are no longer available. Switch to 2025-26 for the current recruiting cycle.</span>
      </div>
    </div>}
    {/* Stats row */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
      {[{label:"TOP NORTHSCORE",value:topNS.ns.toFixed(1),sub:topNS.name,color:T.accent},{label:"POOL AVG",value:avgNS,sub:activePlayers.length+" prospects",color:T.accentMid},{label:"STAT LEADER",value:activePlayers[0].stat.toFixed(0),sub:activePlayers[0].name,color:"#4fc3f7"},{label:"Y1 ROOKIES",value:activePlayers.filter(p=>p.year==="Y1").length,sub:"Full NCAA eligibility",color:T.accentMid}].map(s=>(
        <div key={s.label} style={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:10,padding:"14px 16px"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textLabel,letterSpacing:1.5,marginBottom:5}}>{s.label}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:s.color,lineHeight:1,marginBottom:3}}>{s.value}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>{s.sub}</div>
        </div>
      ))}
    </div>
    {/* Controls */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or team..." style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"7px 12px",color:T.textPrimary,fontSize:11,outline:"none",width:180,fontFamily:"'DM Mono',monospace"}}/>
      {[["filterYear",["ALL","Y1","Y2","Y3","Y4","Y5"],filterYear,setFilterYear,y=>y==="ALL"?"All Years":y],["filterPos",["ALL","Guard","Forward"],filterPos,setFilterPos,p=>p==="ALL"?"All Positions":p+"s"],["filterSys",["ALL","Transition","Press System","Motion Offense","Pick & Roll","Isolation / P&R","Halfcourt"],filterSys,setFilterSys,s=>s==="ALL"?"All Systems":s]].map(([k,opts,val,setter,label])=>(
        <select key={k} value={val} onChange={e=>setter(e.target.value)} style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"7px 10px",color:T.textPrimary,fontSize:11,outline:"none",fontFamily:"'DM Mono',monospace",cursor:"pointer",maxWidth:160}}>
          {opts.map(o=><option key={o} value={o} style={{background:T.bgSelect}}>{label(o)}</option>)}
        </select>
      ))}
      <select value={filterCRM} onChange={e=>setFilterCRM(e.target.value)} style={{background:filterCRM!=="ALL"?`${CRM_STATUS_COLORS[filterCRM]}18`:T.bgInput,border:`1px solid ${filterCRM!=="ALL"?CRM_STATUS_COLORS[filterCRM]+"66":T.borderInput}`,borderRadius:8,padding:"7px 10px",color:filterCRM!=="ALL"?CRM_STATUS_COLORS[filterCRM]:T.textPrimary,fontSize:11,outline:"none",fontFamily:"'DM Mono',monospace",cursor:"pointer"}}>
        <option value="ALL" style={{background:T.bgSelect}}>All Statuses</option>
        {CRM_STATUS_OPTIONS.map(s=><option key={s} value={s} style={{background:T.bgSelect}}>{s}</option>)}
      </select>
      <div style={{display:"flex",gap:4,marginLeft:"auto",alignItems:"center"}}>
        {[["ns","NS"],["stat","Stat"],["fit","Fit"],["elig","Elig"]].map(([k,l])=>(
          <button key={k} onClick={()=>setSortBy(k)} style={{background:sortBy===k?"rgba(26,107,60,0.32)":T.bgChip,border:`1px solid ${sortBy===k?"rgba(26,107,60,0.55)":T.border}`,borderRadius:7,padding:"6px 12px",color:sortBy===k?T.accent:T.textTabInactive,fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"}}>{l}</button>
        ))}
        <div style={{width:1,height:20,background:T.border,margin:"0 4px"}}/>
        <button onClick={handleCopyBoard} title="Copy board as text" style={{background:T.bgChip,border:`1px solid ${T.border}`,borderRadius:7,padding:"6px 11px",color:T.textTabInactive,fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"}}>⎘ Copy</button>
        <button onClick={handleExportCSV} title="Download CSV" style={{background:"rgba(79,195,247,0.08)",border:"1px solid rgba(79,195,247,0.25)",borderRadius:7,padding:"6px 11px",color:"#4fc3f7",fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"}}>↓ CSV</button>
      </div>
    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:1}}>{filtered.length} PROSPECT{filtered.length!==1?"S":""} · CLICK NAME TO EXPAND · STATUS BUTTONS ON EACH CARD</div>
      {exportMsg&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:0.5}}>{exportMsg}</div>}
    </div>
    {/* List + detail split */}
    <div style={{display:"grid",gridTemplateColumns:(!isMobile&&selected)?"1fr 360px":"1fr",gap:14,alignItems:"start"}}>
      <div style={{display:"grid",gap:5}}>
        {filtered.length===0?<div style={{textAlign:"center",padding:48,color:T.textGhost,fontSize:12,fontFamily:"'DM Mono',monospace"}}>No prospects match filters.</div>:filtered.map(p=><PlayerCard key={(p.season||"2024-25")+"-"+p.rank} p={p} onClick={handleSelect} selected={selected?.rank===p.rank&&selected?.season===p.season}/>)}
      </div>
      {selected&&!isMobile&&<div style={{position:"sticky",top:20}}><DetailPanel p={selected} onClose={()=>setSelected(null)} onCompare={onCompare}/></div>}
    </div>

    {/* Mobile: detail panel as full-width block below list */}
    {selected&&isMobile&&(
      <div style={{marginTop:12}}>
        <DetailPanel p={selected} onClose={()=>setSelected(null)} onCompare={onCompare}/>
      </div>
    )}

    {/* CSV / Copy modal */}
    {showCsvModal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999}} onClick={()=>setShowCsvModal(false)}>
      <div style={{background:T.bgCard,border:`1px solid ${T.borderMid}`,borderRadius:12,padding:"20px",width:"min(720px,92vw)",maxHeight:"80vh",display:"flex",flexDirection:"column",gap:10}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.accent,letterSpacing:1.5}}>EXPORT DATA — SELECT ALL &amp; COPY</div>
          <button onClick={()=>setShowCsvModal(false)} style={{background:"transparent",border:`1px solid ${T.border}`,borderRadius:6,color:T.textMuted,cursor:"pointer",padding:"3px 10px",fontSize:11,fontFamily:"'DM Mono',monospace"}}>✕</button>
        </div>
        <textarea readOnly value={csvContent} style={{flex:1,minHeight:320,background:T.bg,border:`1px solid ${T.borderInput}`,borderRadius:7,padding:"10px 12px",color:T.textSecondary,fontSize:12,fontFamily:"'DM Mono',monospace",outline:"none",resize:"none",lineHeight:1.6}} onClick={e=>e.target.select()}/>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>Click inside the text area to select all, then Ctrl+C / ⌘+C to copy</div>
      </div>
    </div>}
  </div>;
}

function PosBar({label,on,need,baseCol,needCol,T}){
  const slots=Array(13).fill(null).map((_,i)=>{
    if(i<on) return "on";
    if(i<on+need) return "need";
    return "empty";
  });
  return (
    <div style={{flex:1,minWidth:0}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:baseCol,fontWeight:700,letterSpacing:0.8}}>{label}</span>
        <div style={{display:"flex",gap:6}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted}}>{on} on</span>
          {need>0&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:needCol,fontWeight:700}}>{need} open</span>}
        </div>
      </div>
      <div style={{display:"flex",gap:2}}>
        {slots.map((t,i)=>(
          <div key={i} style={{
            flex:1, height:10, borderRadius:2,
            background: t==="on"?`${baseCol}50`:t==="need"?`${needCol}30`:T.bgChip,
            border:"1px solid " + (t==="on" ? baseCol+"80" : t==="need" ? needCol+"60" : T.border),
            boxShadow: t==="need"?`0 0 4px ${needCol}44`:"none",
          }}/>
        ))}
      </div>
    </div>
  );
}

function SchoolsTab({activePlayers, activeSeason, onCompare}){
  const mode=useTheme(); const T=THEMES[mode];
  const [search,setSearch] = useState("");
  const [filterConf,setFilterConf] = useState("ALL");
  const [filterTier,setFilterTier] = useState("ALL");
  const [sortBy,setSortBy] = useState("slots");
  const [showShortlistOnly,setShowShortlistOnly] = useState(false);

  // targets: { [schoolName]: [playerName, ...] }
  const [targets, setTargets] = useState({});
  const [pickerOpen, setPickerOpen] = useState(null); // schoolName or null

  // Load targets from storage
  useEffect(()=>{
    (async()=>{
      try {
        const r = (()=>{ try{ const _v=localStorage.getItem("boreal:school-targets"); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(r?.value) setTargets(JSON.parse(r.value));
      } catch(e) {}
    })();
  },[]);

  const saveTargets = async (next) => {
    setTargets(next);
    try{ localStorage.setItem("boreal:school-targets",JSON.stringify(next)); }catch(e){}
  };

  const toggleTarget = (schoolName, playerName) => {
    const current = targets[schoolName] || [];
    const next = current.includes(playerName)
      ? current.filter(n=>n!==playerName)
      : [...current, playerName];
    const updated = {...targets};
    if(next.length===0) delete updated[schoolName];
    else updated[schoolName] = next;
    saveTargets(updated);
  };

  const removeSchool = (schoolName) => {
    const updated = {...targets};
    delete updated[schoolName];
    saveTargets(updated);
  };

  const shortlistCount = Object.keys(targets).length;
  const confs = ["ALL",...new Set(NCAA_SCHOOLS.map(s=>s.conf))];

  const filtered = useMemo(()=>{
    let list=[...NCAA_SCHOOLS];
    if(showShortlistOnly) list=list.filter(s=>targets[s.name]);
    if(search) list=list.filter(s=>s.name.toLowerCase().includes(search.toLowerCase()));
    if(filterConf!=="ALL") list=list.filter(s=>s.conf===filterConf);
    if(filterTier!=="ALL") list=list.filter(s=>s.tier===+filterTier);
    list.sort((a,b)=>sortBy==="slots"?b.slots-a.slots:sortBy==="ca"?b.ca-a.ca:sortBy==="net"?b.net-a.net:a.kp-b.kp);
    return list;
  },[search,filterConf,filterTier,sortBy,showShortlistOnly,targets]);

  const players = activePlayers || PLAYERS_2425;

  return <div>
    {/* ── KenPom data notice ── */}
    <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(26,107,60,0.07)",border:"1px solid rgba(26,107,60,0.25)",borderRadius:8,padding:"8px 14px",marginBottom:14}}>
      <span style={{fontSize:12}}>⚠</span>
      <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accentMid,lineHeight:1.5}}>KenPom data (net rating, pace, W-L, KP rank) reflects the <strong style={{color:T.accent}}>2024-25 season</strong>. Scheduled for refresh after the spring 2026 portal window closes (Apr 21, 2026).</span>
    </div>
    {/* ── Controls ── */}
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14,alignItems:"center"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search school..."
        style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"7px 12px",color:T.textPrimary,fontSize:11,outline:"none",width:150,fontFamily:"'DM Mono',monospace"}}/>
      <select value={filterConf} onChange={e=>setFilterConf(e.target.value)}
        style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"7px 10px",color:T.textPrimary,fontSize:11,outline:"none",fontFamily:"'DM Mono',monospace",cursor:"pointer"}}>
        {confs.map(c=><option key={c} value={c} style={{background:T.bgSelect}}>{c==="ALL"?"All Confs":c}</option>)}
      </select>
      <select value={filterTier} onChange={e=>setFilterTier(e.target.value)}
        style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"7px 10px",color:T.textPrimary,fontSize:11,outline:"none",fontFamily:"'DM Mono',monospace",cursor:"pointer"}}>
        {["ALL","1","2","3"].map(t=><option key={t} value={t} style={{background:T.bgSelect}}>{t==="ALL"?"All Tiers":`Tier ${t}`}</option>)}
      </select>

      {/* Shortlist toggle */}
      <button onClick={()=>setShowShortlistOnly(v=>!v)} style={{
        display:"flex",alignItems:"center",gap:6,
        background:showShortlistOnly?"rgba(26,107,60,0.28)":T.bgChip,
        border:`1px solid ${showShortlistOnly?"rgba(26,107,60,0.6)":T.border}`,
        borderRadius:7,padding:"6px 12px",
        color:showShortlistOnly?T.accent:T.textTabInactive,
        fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"
      }}>
        📍 Shortlist {shortlistCount>0 && <span style={{background:T.accent,color:"#000",borderRadius:10,padding:"1px 6px",fontSize:12,fontWeight:700}}>{shortlistCount}</span>}
      </button>

      <div style={{display:"flex",gap:4,marginLeft:"auto"}}>
        {[["slots","'26-27 Slots"],["ca","CA '24-25"],["net","Net Rtg"],["kp","KP Rank"]].map(([k,l])=>(
          <button key={k} onClick={()=>setSortBy(k)} style={{
            background:sortBy===k?"rgba(26,107,60,0.32)":T.bgChip,
            border:`1px solid ${sortBy===k?"rgba(26,107,60,0.55)":T.border}`,
            borderRadius:7,padding:"6px 12px",color:sortBy===k?T.accent:T.textTabInactive,
            fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"
          }}>{l}</button>
        ))}
      </div>
    </div>

    {/* ── Shortlist summary banner ── */}
    {shortlistCount>0&&showShortlistOnly&&(
      <div style={{background:"rgba(26,107,60,0.08)",border:"1px solid rgba(26,107,60,0.2)",borderRadius:8,padding:"10px 14px",marginBottom:12,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:1}}>SHORTLIST · {shortlistCount} SCHOOL{shortlistCount!==1?"S":""}</span>
        {Object.entries(targets).map(([school, pNames])=>(
          <span key={school} style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textSecondary}}>
            {school} <span style={{color:T.accent}}>({pNames.length})</span>
          </span>
        ))}
      </div>
    )}

    {showShortlistOnly&&shortlistCount===0&&(
      <div style={{textAlign:"center",padding:"40px 20px",fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textGhost}}>
        No schools targeted yet. Click <span style={{color:T.accent}}>+ Target</span> on any school card to build your shortlist.
      </div>
    )}

    {/* ── School cards ── */}
    <div style={{display:"grid",gap:8}}>
      {filtered.map(s=>{
        const paceCol=PACE_COLORS[s.pace]||T.textPrimary;
        const tierCol={1:T.accent,2:"#4fc3f7",3:T.textSecondary}[s.tier]||T.textPrimary;
        const sysCol=SYS_COLORS[s.sys]||SYS_COLORS["Isolation / P&R"];
        const [gOn,fOn,cOn]=s.pos||[0,0,0];
        const [gNeed,fNeed,cNeed]=s.need||[0,0,0];
        const schoolTargets = targets[s.name] || [];
        const isTargeted = schoolTargets.length > 0;
        const isPickerOpen = pickerOpen === s.name;

        return <div key={s.name} style={{
          background:T.bgCard,
          border:`1px solid ${isTargeted?"rgba(26,107,60,0.35)":T.border}`,
          borderRadius:10,padding:"14px 18px",
          boxShadow:isTargeted?"0 0 0 1px rgba(26,107,60,0.1)":"none",
          transition:"border-color 0.2s"
        }}>
          {/* Header row */}
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:8,gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",flex:1}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:T.textPrimary}}>{s.name}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textTabInactive}}>{s.conf}</span>
              <span style={{fontSize:12,padding:"2px 7px",borderRadius:3,color:tierCol,border:`1px solid ${tierCol}44`,background:`${tierCol}11`,fontFamily:"'DM Mono',monospace"}}>T{s.tier}</span>
              <span style={{fontSize:12,padding:"2px 7px",borderRadius:3,background:`${sysCol}22`,color:sysCol,border:`1px solid ${sysCol}40`,fontFamily:"'DM Mono',monospace"}}>{s.sys}</span>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              {/* Open slots badge */}
              <div style={{textAlign:"center",background:"rgba(0,230,118,0.06)",border:"1px solid rgba(0,230,118,0.15)",borderRadius:7,padding:"5px 12px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint,letterSpacing:1,marginBottom:1}}>SLOTS '26-27</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:s.slots>=5?T.accent:s.slots>=3?T.accentMid:T.textSecondary,lineHeight:1}}>{s.slots}</div>
              </div>

              {/* Target button */}
              <div style={{position:"relative"}}>
                <button onClick={()=>setPickerOpen(isPickerOpen?null:s.name)} style={{
                  display:"flex",alignItems:"center",gap:5,
                  background:isTargeted?"rgba(26,107,60,0.22)":T.bgChip,
                  border:`1px solid ${isTargeted?"rgba(26,107,60,0.5)":T.border}`,
                  borderRadius:7,padding:"6px 11px",
                  color:isTargeted?T.accent:T.textMuted,
                  fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",
                  letterSpacing:0.5,transition:"all 0.15s",whiteSpace:"nowrap"
                }}>
                  📍 {isTargeted ? schoolTargets.length+" targeted" : "+ Target"}
                </button>

                {/* Player picker dropdown */}
                {isPickerOpen&&(
                  <div style={{
                    position:"absolute",right:0,top:"calc(100% + 6px)",zIndex:100,
                    background:T.bgPanel,border:`1px solid ${T.borderMid}`,
                    borderRadius:10,padding:"10px",minWidth:220,maxHeight:280,
                    overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.4)"
                  }}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:1.5,marginBottom:8,padding:"0 2px"}}>
                      TAG PROSPECTS → {s.name.toUpperCase()}
                    </div>
                    {players.map(p=>{
                      const isOn = schoolTargets.includes(p.name);
                      return (
                        <div key={p.name} onClick={()=>toggleTarget(s.name, p.name)} style={{
                          display:"flex",alignItems:"center",gap:8,padding:"6px 8px",
                          borderRadius:6,cursor:"pointer",marginBottom:2,
                          background:isOn?"rgba(26,107,60,0.18)":"transparent",
                          border:`1px solid ${isOn?"rgba(26,107,60,0.35)":"transparent"}`,
                          transition:"all 0.1s"
                        }}>
                          <div style={{
                            width:14,height:14,borderRadius:3,flexShrink:0,
                            background:isOn?T.accent:"transparent",
                            border:`1px solid ${isOn?T.accent:T.borderMid}`,
                            display:"flex",alignItems:"center",justifyContent:"center",
                            fontSize:13,color:"#000",transition:"all 0.1s"
                          }}>{isOn?"✓":""}</div>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:isOn?T.textPrimary:T.textSecondary,fontWeight:isOn?700:400}}>{p.name}</div>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>{p.pos} · {p.year} · NS {p.ns}</div>
                          </div>
                        </div>
                      );
                    })}
                    {isTargeted&&(
                      <div style={{borderTop:`1px solid ${T.borderHr}`,marginTop:6,paddingTop:6}}>
                        <div onClick={()=>{removeSchool(s.name); setPickerOpen(null);}} style={{
                          fontFamily:"'DM Mono',monospace",fontSize:12,color:"#ef5350",
                          cursor:"pointer",padding:"4px 6px",borderRadius:4,
                          textAlign:"center",letterSpacing:0.5
                        }}>✕ Remove from shortlist</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tagged players chips */}
          {isTargeted&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
              {schoolTargets.map(pn=>{
                const p = players.find(x=>x.name===pn);
                return (
                  <span key={pn} style={{
                    display:"inline-flex",alignItems:"center",gap:4,
                    fontFamily:"'DM Mono',monospace",fontSize:12,
                    background:"rgba(26,107,60,0.14)",color:T.accent,
                    border:"1px solid rgba(26,107,60,0.3)",
                    borderRadius:20,padding:"3px 9px"
                  }}>
                    {pn}{p&&<span style={{color:T.textFaint}}> · NS {p.ns}</span>}
                    <span onClick={e=>{e.stopPropagation(); toggleTarget(s.name,pn);}}
                      style={{color:T.textMuted,cursor:"pointer",fontSize:13,marginLeft:2,lineHeight:1}}>×</span>
                  </span>
                );
              })}
              {schoolTargets.length>=2&&onCompare&&(()=>{
                const [pA, pB] = schoolTargets.slice(0,2).map(pn=>players.find(x=>x.name===pn)).filter(Boolean);
                if(!pA||!pB) return null;
                return <button onClick={e=>{e.stopPropagation(); onCompare(pA); setTimeout(()=>onCompare(pB),50);}}
                  style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"3px 9px",borderRadius:12,
                    border:"1px solid rgba(79,195,247,0.3)",background:"rgba(79,195,247,0.08)",
                    color:"#4fc3f7",cursor:"pointer",letterSpacing:0.3,display:"inline-flex",alignItems:"center",gap:4}}>
                  ⚖ Compare top 2
                </button>;
              })()}
            </div>
          )}

          {/* Stats row */}
          <div style={{display:"flex",alignItems:"center",gap:14,flexWrap:"wrap",marginBottom:12}}>
            {[
              ["W-L", s.w+"-"+s.l, T.textPrimary],
              ["KP", "#"+s.kp, T.textPrimary],
              ["Net", (s.net>0?"+":"")+s.net.toFixed(1), s.net>0?T.accent:"#ef5350"],
              ["AdjT", s.adjt.toFixed(1), T.textPrimary],
              ["Pace", s.pace, paceCol],
              ["CA '24-25", s.ca, T.accent],
              ["Coach", s.coach+" ("+s.tenure+"yr)", T.textSecondary]
            ].map(([l,v,c])=>(
              <div key={l} style={{display:"flex",alignItems:"center",gap:3}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,letterSpacing:0.5}}>{l}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:c,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>

          {/* Roster needs */}
          <div style={{borderTop:`1px solid ${T.borderHr}`,paddingTop:10,display:"flex",gap:10}}>
            <PosBar label="GUARDS"   on={gOn} need={gNeed} baseCol="#4fc3f7" needCol="#00e5ff" T={T}/>
            <div style={{width:1,background:T.borderHr,flexShrink:0,margin:"0 2px"}}/>
            <PosBar label="FORWARDS" on={fOn} need={fNeed} baseCol="#ce93d8" needCol="#ea80fc" T={T}/>
            <div style={{width:1,background:T.borderHr,flexShrink:0,margin:"0 2px"}}/>
            <PosBar label="CENTERS"  on={cOn} need={cNeed} baseCol="#ff8a65" needCol="#ff6e40" T={T}/>
          </div>
          <div style={{marginTop:5,fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textGhost}}>
            ■ returning &nbsp;·&nbsp; <span style={{color:"rgba(0,229,255,0.4)"}}>■</span> projected open (ESPN 2025-26)
          </div>
        </div>;
      })}
    </div>

    {/* Click-away to close picker */}
    {pickerOpen&&<div onClick={()=>setPickerOpen(null)} style={{position:"fixed",inset:0,zIndex:99}}/>}
  </div>;
}

const STATUS_CONFIG = {
  "Watchlist":   { color:"#90a4ae", bg:"rgba(144,164,174,0.10)", border:"rgba(144,164,174,0.25)", icon:"👁",  order:1 },
  "Shortlisted": { color:"#ffe082", bg:"rgba(255,224,130,0.10)", border:"rgba(255,224,130,0.25)", icon:"⭐", order:2 },
  "Contacted":   { color:"#4fc3f7", bg:"rgba(79,195,247,0.10)",  border:"rgba(79,195,247,0.25)",  icon:"📞", order:3 },
  "Offer Out":   { color:"#ff8a65", bg:"rgba(255,138,101,0.10)", border:"rgba(255,138,101,0.25)", icon:"📋", order:4 },
  "Verbal":      { color:"#ce93d8", bg:"rgba(206,147,216,0.10)", border:"rgba(206,147,216,0.25)", icon:"🤝", order:5 },
  "Signed":      { color:"#00e676", bg:"rgba(0,230,118,0.10)",   border:"rgba(0,230,118,0.25)",   icon:"✅", order:6 },
};


const CRM_STATUS_OPTIONS = Object.keys(STATUS_CONFIG);
const CRM_STATUS_COLORS = Object.fromEntries(Object.entries(STATUS_CONFIG).map(([k,v])=>[k,v.color]));
const BLANK_ENTRY = { name:"", from:"", to:"", conf:"", year:"Y3", pos:"Guard", ht:"", wt:"", sys:"Isolation / P&R", ns:"", status:"Watchlist", season:"2025-26", entered:"", signed:"", note:"", source:"", boardRank:null };

function PipelineField({label,field,type="text",opts=null,form,setForm,T}){
  return <div style={{display:"flex",flexDirection:"column",gap:3}}>
    <label style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,letterSpacing:0.5}}>{label}</label>
    {opts
      ? <select value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
          style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:5,padding:"6px 8px",color:T.textPrimary,fontSize:11,fontFamily:"'DM Mono',monospace",outline:"none"}}>
          {opts.map(o=><option key={o} value={o} style={{background:T.bgSelect}}>{o}</option>)}
        </select>
      : <input type={type} value={form[field]} onChange={e=>setForm(f=>({...f,[field]:e.target.value}))}
          style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:5,padding:"6px 8px",color:T.textPrimary,fontSize:11,fontFamily:"'DM Mono',monospace",outline:"none"}}/>
    }
  </div>;
}

function PipelineTab({ activePlayers=[], allPlayers=[], watchlistEntries=[], setWatchlistEntries=()=>{} }){
  const mode=useTheme(); const T=THEMES[mode];
  const [storageReady, setStorageReady] = useState(false);
  const [activityLog, setActivityLog] = useState([]);
  const [showChecklist, setShowChecklist] = useState({});
  const [checklists, setChecklists] = useState({});
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({...BLANK_ENTRY});
  const [editId, setEditId] = useState(null);
  const [showPastTransfers, setShowPastTransfers] = useState(false);

  const CHECKLIST_ITEMS = [
    "Film reviewed (2+ games)",
    "Contact made with player",
    "Academic eligibility confirmed",
    "NCAA Eligibility Center file started",
    "Fit schools identified",
    "Head coach briefed",
  ];

  function logActivity(msg){
    const ts = new Date().toLocaleString("en-CA",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
    setActivityLog(prev=>[{msg,ts,id:Date.now()},...prev].slice(0,50));
  }

  // Load from persistent storage
  useEffect(()=>{
    (async()=>{
      try {
        const logResult = (()=>{ try{ const _v=localStorage.getItem("pipeline:activitylog"); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(logResult?.value) setActivityLog(JSON.parse(logResult.value));
        const clResult = (()=>{ try{ const _v=localStorage.getItem("pipeline:checklists"); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(clResult?.value) setChecklists(JSON.parse(clResult.value));
      } catch(e){}
      setStorageReady(true);
    })();
  },[]);

  useEffect(()=>{
    if(!storageReady) return;
    try{ localStorage.setItem("pipeline:activitylog",JSON.stringify(activityLog)); }catch(e){}
  },[activityLog, storageReady]);

  useEffect(()=>{
    if(!storageReady) return;
    try{ localStorage.setItem("pipeline:checklists",JSON.stringify(checklists)); }catch(e){}
  },[checklists, storageReady]);

  function handleSave(){
    if(!form.name.trim()) return;
    if(editId){
      setWatchlistEntries(prev=>prev.map(e=>e.id===editId?{...form,id:editId}:e));
      logActivity(`Updated: ${form.name}`);
      setEditId(null);
    } else {
      const newEntry = {...form, id:`entry-${Date.now()}`};
      setWatchlistEntries(prev=>[...prev, newEntry]);
      logActivity(`Manually added: ${form.name}`);
    }
    setForm({...BLANK_ENTRY});
    setShowForm(false);
  }

  function handleEdit(entry){
    setForm({...entry});
    setEditId(entry.id);
    setShowForm(true);
  }

  function handleDelete(id){
    const e = watchlistEntries.find(x=>x.id===id);
    if(e) logActivity(`Removed from watchlist: ${e.name}`);
    setWatchlistEntries(prev=>prev.filter(e=>e.id!==id));
  }

  function handleStatusAdvance(entry){
    const order = STATUS_CONFIG[entry.status]?.order || 1;
    const nextStatus = Object.keys(STATUS_CONFIG).find(k=>STATUS_CONFIG[k].order===order+1);
    if(nextStatus){
      setWatchlistEntries(prev=>prev.map(e=>e.id===entry.id?{...e,status:nextStatus}:e));
      logActivity(`${entry.name}: ${entry.status} → ${nextStatus}`);
    }
  }

  function handleStatusSet(entry, newStatus){
    setWatchlistEntries(prev=>prev.map(e=>e.id===entry.id?{...e,status:newStatus}:e));
    logActivity(`${entry.name}: status set to ${newStatus}`);
  }

  function toggleChecklistItem(entryId, item){
    setChecklists(prev=>{
      const cur = prev[entryId]||[];
      const next = cur.includes(item) ? cur.filter(x=>x!==item) : [...cur,item];
      return {...prev,[entryId]:next};
    });
  }

  // Portal window
  const PORTAL_OPEN  = new Date("2026-04-07");
  const PORTAL_CLOSE = new Date("2026-04-21");
  const now = new Date();
  const totalDays = Math.round((PORTAL_CLOSE-PORTAL_OPEN)/(1000*60*60*24));
  const daysToPortal = Math.ceil((PORTAL_OPEN-now)/(1000*60*60*24));
  const daysRemaining = Math.ceil((PORTAL_CLOSE-now)/(1000*60*60*24));
  const portalOpen = now >= PORTAL_OPEN && now <= PORTAL_CLOSE;
  const portalClosed = now > PORTAL_CLOSE;
  const urgency = portalOpen && daysRemaining <= 7;

  const filtered = watchlistEntries
    .filter(e=> filterStatus==="ALL" || e.status===filterStatus)
    .sort((a,b)=>(STATUS_CONFIG[b.status]?.order||0)-(STATUS_CONFIG[a.status]?.order||0));

  const stats = Object.keys(STATUS_CONFIG).map(s=>({label:s,count:watchlistEntries.filter(e=>e.status===s).length,...STATUS_CONFIG[s]}));
  const signed = watchlistEntries.filter(e=>e.status==="Signed").length;
  const shortlisted = watchlistEntries.filter(e=>e.status==="Shortlisted"||e.status==="Contacted"||e.status==="Offer Out"||e.status==="Verbal").length;

  return <div>

    {/* ── Portal window banner ──────────────────────────────────────── */}
    <div style={{background:portalOpen?(urgency?"rgba(239,83,80,0.07)":"rgba(0,230,118,0.07)"):portalClosed?"rgba(100,100,100,0.05)":"rgba(255,224,130,0.06)",border:`1px solid ${portalOpen?(urgency?"rgba(239,83,80,0.3)":"rgba(0,230,118,0.2)"):portalClosed?T.borderMid:"rgba(255,224,130,0.2)"}`,borderRadius:12,padding:"16px 20px",marginBottom:18}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,letterSpacing:1.5,marginBottom:4}}>NCAA SPRING PORTAL WINDOW · {portalOpen?"ACTIVE":"Apr 7 – Apr 21, 2026"}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:portalOpen?(urgency?"#ef5350":T.accent):portalClosed?T.textMuted:T.accent,marginBottom:4}}>
            {portalOpen ? urgency ? `🔴 ${daysRemaining} day${daysRemaining===1?"":"s"} left — final push` : `🟢 Portal open · ${daysRemaining} of ${totalDays} days remaining`
              : portalClosed ? "⬜ Spring window closed · Fall window opens Nov 2026"
              : `⏱ Opens in ${daysToPortal} day${daysToPortal===1?"":"s"} · April 7`}
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>
            {portalOpen ? "Portal closes Apr 21 · Players must be entered before deadline"
              : portalClosed ? "Prep the fall window: review 2025-26 board, identify Y1–Y3 targets"
              : "Pre-window: Watch prospects → Shortlist targets → Reach out before portal opens"}
          </div>
        </div>
        {portalOpen&&<div style={{minWidth:160}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:1,marginBottom:4}}>WINDOW PROGRESS</div>
          <div style={{background:T.bgChip,borderRadius:4,height:6,overflow:"hidden",width:160}}>
            <div style={{height:"100%",background:urgency?"#ef5350":T.accent,width:`${Math.min(100,Math.round((1-daysRemaining/totalDays)*100))}%`,transition:"width 0.3s"}}/>
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginTop:3}}>Day {Math.round((now-PORTAL_OPEN)/(1000*60*60*24))+1} of {totalDays}</div>
        </div>}
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          {[["Signed",signed,T.accent],["Active",shortlisted,T.accentMid],["Watching",watchlistEntries.filter(e=>e.status==="Watchlist").length,"#90a4ae"]].map(([l,v,c])=>(
            <div key={l} style={{textAlign:"center"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:c,lineHeight:1}}>{v}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:1}}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Pre-window checklist ──────────────────────────────────────── */}
    {!portalOpen&&!portalClosed&&<div style={{background:T.bgCard,border:"1px solid rgba(255,224,130,0.2)",borderRadius:10,padding:"14px 18px",marginBottom:16}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:1.5,marginBottom:10}}>📋 PRE-WINDOW PREP — {daysToPortal} DAYS OUT</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
        {[{label:"Board finalized",sub:"2025-26 rankings locked"},{label:"Top 10 shortlisted",sub:"Use ⭐ button on any player card"},{label:"Film reviewed",sub:"2+ games per shortlisted prospect"},{label:"Initial contact made",sub:"Email / DM / coach outreach"},{label:"Eligibility docs ready",sub:"NCAA EC file templates"},{label:"Fit schools mapped",sub:"NorthScore fit1/fit2/fit3 confirmed"}].map(({label,sub})=>{
          const checked=(checklists["prewindow"]||[]).includes(label);
          return <div key={label} onClick={()=>toggleChecklistItem("prewindow",label)}
            style={{display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer",padding:"8px 10px",borderRadius:7,background:checked?"rgba(0,230,118,0.07)":T.bgChip,border:`1px solid ${checked?"rgba(0,230,118,0.2)":T.borderMid}`,transition:"all 0.15s"}}>
            <div style={{width:14,height:14,borderRadius:3,border:`2px solid ${checked?T.accent:T.borderMid}`,background:checked?T.accent:"transparent",flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000"}}>{checked&&"✓"}</div>
            <div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:checked?T.accent:T.textSecondary,fontWeight:600}}>{label}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginTop:1}}>{sub}</div>
            </div>
          </div>;
        })}
      </div>
      <div style={{marginTop:10,fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>{(checklists["prewindow"]||[]).length} / 6 complete</div>
    </div>}

    {/* ── Section header: My Watchlist ─────────────────────────────── */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
      <div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:T.textPrimary}}>🎯 My Watchlist</div>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,marginTop:2}}>Set any player's STATUS on the Prospects tab — they flow here automatically · Or use + Manual Entry</div>
      </div>
      <button onClick={()=>{ setForm({...BLANK_ENTRY}); setEditId(null); setShowForm(v=>!v); }}
        style={{background:showForm?T.border:"rgba(0,230,118,0.10)",border:`1px solid ${showForm?T.borderInput:"rgba(0,230,118,0.28)"}`,borderRadius:7,padding:"6px 14px",color:showForm?T.textMuted:T.accent,fontSize:11,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:600,letterSpacing:0.5}}>
        {showForm?"✕ Cancel":"+ Manual Entry"}
      </button>
    </div>

    {/* ── Status filter pills ───────────────────────────────────────── */}
    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
      <button onClick={()=>setFilterStatus("ALL")} style={{background:filterStatus==="ALL"?T.bgTabActive:T.bgCard,border:`1px solid ${T.borderInput}`,borderRadius:16,padding:"4px 12px",color:T.textSecondary,fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>
        ALL ({watchlistEntries.length})
      </button>
      {stats.filter(s=>s.count>0||filterStatus===s.label).map(s=>(
        <button key={s.label} onClick={()=>setFilterStatus(s.label)}
          style={{background:filterStatus===s.label?s.bg:T.bgCard,border:`1px solid ${filterStatus===s.label?s.border:T.borderMid}`,borderRadius:16,padding:"4px 12px",color:filterStatus===s.label?s.color:T.textMuted,fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",transition:"all 0.15s"}}>
          {s.icon} {s.label} ({s.count})
        </button>
      ))}
    </div>

    {/* ── Manual entry form ─────────────────────────────────────────── */}
    {showForm&&<div style={{background:"rgba(0,230,118,0.04)",border:"1px solid rgba(0,230,118,0.15)",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.accent,letterSpacing:1.5,marginBottom:14}}>{editId?"EDIT ENTRY":"NEW WATCHLIST ENTRY"}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:12}}>
        <PipelineField label="PLAYER NAME" field="name" form={form} setForm={setForm} T={T}/>
        <PipelineField label="U SPORTS TEAM" field="from" form={form} setForm={setForm} T={T}/>
        <PipelineField label="TARGET SCHOOL" field="to" form={form} setForm={setForm} T={T}/>
        <PipelineField label="CONFERENCE" field="conf" form={form} setForm={setForm} T={T}/>
        <PipelineField label="POSITION" field="pos" opts={["Guard","Forward","Wing","Center"]} form={form} setForm={setForm} T={T}/>
        <PipelineField label="U YEAR" field="year" opts={["Y1","Y2","Y3","Y4","Y5"]} form={form} setForm={setForm} T={T}/>
        <PipelineField label="HEIGHT" field="ht" form={form} setForm={setForm} T={T}/>
        <PipelineField label="NORTHSCORE™" field="ns" form={form} setForm={setForm} T={T}/>
        <PipelineField label="STATUS" field="status" opts={Object.keys(STATUS_CONFIG)} form={form} setForm={setForm} T={T}/>
        <PipelineField label="SEASON" field="season" opts={["2024-25","2025-26","2026-27"]} form={form} setForm={setForm} T={T}/>
      </div>
      <div style={{marginBottom:14}}><PipelineField label="SCOUT NOTE" field="note" form={form} setForm={setForm} T={T}/></div>
      <button onClick={handleSave} style={{background:"rgba(0,230,118,0.15)",border:"1px solid rgba(0,230,118,0.35)",borderRadius:7,padding:"8px 20px",color:T.accent,fontSize:11,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:700,letterSpacing:0.5}}>
        {editId?"Save Changes":"Add to Watchlist"}
      </button>
    </div>}

    {/* ── Watchlist cards ───────────────────────────────────────────── */}
    <div style={{display:"grid",gap:8,marginBottom:28}}>
      {filtered.length===0&&<div style={{textAlign:"center",padding:"36px 20px",background:T.bgCard,border:`1px dashed ${T.borderDash}`,borderRadius:12,fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textGhost,lineHeight:2}}>
        No prospects on your watchlist yet.<br/>
        <span style={{fontSize:13,color:T.textFaint}}>Set any player's STATUS to Watchlist, Contacted, or higher on the Prospects tab — they'll appear here automatically.</span>
      </div>}
      {filtered.map(p=>{
        const sc = STATUS_CONFIG[p.status]||STATUS_CONFIG["Watchlist"];
        const nextStatus = Object.keys(STATUS_CONFIG).find(k=>STATUS_CONFIG[k].order===(sc.order+1));
        const cl = checklists[p.id]||[];
        const clDone = cl.length;
        const clTotal = CHECKLIST_ITEMS.length;
        const clOpen = showChecklist[p.id];
        return <div key={p.id} style={{background:T.bgCard,border:`1px solid ${sc.border}`,borderRadius:10,padding:"16px 18px"}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
                <span style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:T.textPrimary}}>{p.name}</span>
                <span style={{fontSize:12,padding:"2px 8px",borderRadius:10,background:sc.bg,color:sc.color,border:`1px solid ${sc.border}`,fontFamily:"'DM Mono',monospace",fontWeight:600}}>{sc.icon} {p.status}</span>
                {p.boardRank&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>Board #{p.boardRank}</span>}
                {p.season&&<span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textGhost}}>{p.season}</span>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'DM Mono',monospace",fontSize:11,marginBottom:8,flexWrap:"wrap"}}>
                <span style={{color:T.textMuted}}>{p.from}</span>
                {p.to&&<>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,background:T.bgChip,border:`1px solid ${T.borderMid}`,borderRadius:3,padding:"1px 5px",letterSpacing:0.5}}>TOP FIT</span>
                  <span style={{color:T.textSecondary,fontWeight:600}}>{p.to}</span>
                  {p.conf&&<span style={{color:T.textMuted,fontSize:13}}>({p.conf})</span>}
                </>}
              </div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:p.note?8:0}}>
                {[["POS",p.pos],["YR",p.year],p.ht?["HT",p.ht]:null,p.ns?["NS",typeof p.ns==="number"?p.ns.toFixed(1):p.ns]:null,p.sys?["SYS",p.sys]:null].filter(Boolean).map(([l,v])=>(
                  <div key={l} style={{background:T.bgChip,borderRadius:5,padding:"3px 8px"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint,letterSpacing:0.8,marginBottom:1}}>{l}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textPrimary,fontWeight:600}}>{v}</div>
                  </div>
                ))}
                <div onClick={()=>setShowChecklist(prev=>({...prev,[p.id]:!prev[p.id]}))}
                  style={{background:clDone===clTotal?"rgba(0,230,118,0.08)":T.bgChip,borderRadius:5,padding:"3px 8px",cursor:"pointer",border:`1px solid ${clDone===clTotal?"rgba(0,230,118,0.2)":T.borderMid}`}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint,letterSpacing:0.8,marginBottom:1}}>PREP</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:clDone===clTotal?T.accent:T.textPrimary,fontWeight:600}}>{clDone}/{clTotal}</div>
                </div>
              </div>
              {p.note&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textMuted,lineHeight:1.65,borderTop:`1px solid ${T.borderHr}`,paddingTop:7,marginTop:4}}>{p.note}</div>}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end",flexShrink:0}}>
              {nextStatus&&<button onClick={()=>handleStatusAdvance(p)}
                style={{background:STATUS_CONFIG[nextStatus]?.bg,border:`1px solid ${STATUS_CONFIG[nextStatus]?.border}`,borderRadius:6,padding:"5px 10px",color:STATUS_CONFIG[nextStatus]?.color,fontSize:12,cursor:"pointer",fontFamily:"'DM Mono',monospace",fontWeight:600,whiteSpace:"nowrap"}}>
                → {nextStatus}
              </button>}
              <button onClick={()=>handleEdit(p)} style={{background:T.bgCard,border:`1px solid ${T.borderMid}`,borderRadius:6,padding:"5px 10px",color:T.textMuted,fontSize:12,cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>Edit</button>
              <button onClick={()=>handleDelete(p.id)} style={{background:"rgba(239,83,80,0.04)",border:"1px solid rgba(239,83,80,0.15)",borderRadius:6,padding:"5px 10px",color:"rgba(239,83,80,0.5)",fontSize:12,cursor:"pointer",fontFamily:"'DM Mono',monospace"}}>Remove</button>
            </div>
          </div>

          {/* Status trail */}
          <div style={{display:"flex",gap:3,alignItems:"center",marginBottom:clOpen?10:0}}>
            {Object.entries(STATUS_CONFIG).sort((a,b)=>a[1].order-b[1].order).map(([s,cfg],i,arr)=>{
              const reached = cfg.order <= sc.order;
              return <div key={s} style={{display:"flex",alignItems:"center",gap:3}}>
                <div title={s} style={{width:8,height:8,borderRadius:"50%",background:reached?cfg.color:T.bgChip,border:`1px solid ${reached?cfg.color:T.borderMid}`,transition:"all 0.2s"}}/>
                {i<arr.length-1&&<div style={{width:10,height:1,background:reached&&cfg.order<sc.order?cfg.color:T.border}}/>}
              </div>;
            })}
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginLeft:6}}>{p.entered&&`Added ${p.entered}`}</span>
          </div>

          {/* Per-player checklist */}
          {clOpen&&<div style={{borderTop:`1px solid ${T.borderHr}`,paddingTop:10}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,letterSpacing:1,marginBottom:8}}>RECRUITING CHECKLIST</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:5}}>
              {CHECKLIST_ITEMS.map(item=>{
                const checked=cl.includes(item);
                return <div key={item} onClick={()=>toggleChecklistItem(p.id,item)}
                  style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",padding:"5px 8px",borderRadius:5,background:checked?"rgba(0,230,118,0.06)":T.bgChip}}>
                  <div style={{width:12,height:12,borderRadius:2,border:`2px solid ${checked?T.accent:T.borderMid}`,background:checked?T.accent:"transparent",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000"}}>{checked&&"✓"}</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:checked?T.accent:T.textSecondary}}>{item}</div>
                </div>;
              })}
            </div>
          </div>}
        </div>;
      })}
    </div>

    {/* ── Activity feed ─────────────────────────────────────────────── */}
    {activityLog.length>0&&<div style={{marginBottom:28,background:T.bgCard,border:`1px solid ${T.borderMid}`,borderRadius:10,padding:"14px 18px"}}>
      <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,letterSpacing:1.5,marginBottom:10}}>ACTIVITY LOG</div>
      <div style={{display:"grid",gap:5,maxHeight:160,overflowY:"auto"}}>
        {activityLog.map(l=>(
          <div key={l.id} style={{display:"flex",gap:10,alignItems:"baseline"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,whiteSpace:"nowrap",flexShrink:0}}>{l.ts}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textSecondary}}>{l.msg}</div>
          </div>
        ))}
      </div>
    </div>}

    {/* ── Past Transfers section ────────────────────────────────────── */}
    <div style={{borderTop:`1px solid ${T.borderHr}`,paddingTop:20}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,cursor:"pointer"}} onClick={()=>setShowPastTransfers(v=>!v)}>
        <div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:T.textSecondary}}>📚 Past Transfers — U SPORTS → NCAA Alumni</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginTop:3}}>Players who have already made the jump. Reference only — not in the current portal.</div>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textFaint,padding:"4px 10px",border:`1px solid ${T.borderMid}`,borderRadius:6}}>{showPastTransfers?"Hide":"Show"} ({PAST_TRANSFERS.length})</span>
      </div>
      {showPastTransfers&&<div style={{display:"grid",gap:7}}>
        {PAST_TRANSFERS.map(t=>(
          <div key={t.id} style={{background:T.bgCard,border:`1px solid ${T.borderMid}`,borderRadius:9,padding:"14px 16px",opacity:0.8}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontWeight:700,color:T.textPrimary}}>{t.name}</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,padding:"2px 7px",borderRadius:8,background:"rgba(0,230,118,0.08)",color:T.accent,border:"1px solid rgba(0,230,118,0.2)"}}>✅ SIGNED</span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>{t.season}</span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:8,fontFamily:"'DM Mono',monospace",fontSize:11,marginBottom:6}}>
                  <span style={{color:T.textMuted}}>{t.from}</span>
                  <span style={{color:T.textFaint,fontSize:13}}>→</span>
                  <span style={{color:T.accent,fontWeight:700}}>{t.to}</span>
                  <span style={{color:T.textMuted}}>({t.conf})</span>
                </div>
                {t.notes&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textGhost,lineHeight:1.6}}>{t.notes}</div>}
              </div>
              <div style={{display:"flex",gap:6}}>
                {[["POS",t.pos],["YR",t.uYear]].map(([l,v])=>(
                  <div key={l} style={{background:T.bgChip,borderRadius:5,padding:"3px 8px",textAlign:"center"}}>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint,letterSpacing:0.8}}>{l}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textSecondary,fontWeight:600}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  </div>;
}

function EligibilityTab({activePlayers, onFilterYear}){
  const mode=useTheme(); const T=THEMES[mode];
  return <div>
    <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textMuted,letterSpacing:1.5,marginBottom:6}}>U SPORTS YEAR → NCAA ELIGIBILITY</div>
    <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textSecondary,marginBottom:20,lineHeight:1.7}}>A player's U SPORTS year determines how many NCAA seasons remain. This drives the Eligibility Score in NorthScore™ and is critical context for any program evaluating a transfer.</div>
    <div style={{display:"grid",gap:10,marginBottom:32}}>
      {ELIG_GUIDE.map(e=>(
        <div key={e.year} style={{background:T.bgCard,border:`1px solid ${e.color}22`,borderRadius:10,padding:"16px 20px",display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontWeight:700,color:e.color,marginBottom:4}}>{e.year}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textSecondary,marginBottom:8}}>{e.ncaa}</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:T.textMuted,lineHeight:1.65}}>{e.note}</div>
          </div>
          <div style={{textAlign:"center",minWidth:72}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textLabel,letterSpacing:1.5,marginBottom:4}}>ELIG SCORE</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:e.color}}>{e.score}</div>
            <ScoreBar value={e.score} color={e.color}/>
          </div>
        </div>
      ))}
    </div>
    <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,letterSpacing:1.5,marginBottom:10}}>CURRENT POOL BREAKDOWN · CLICK TO FILTER BOARD</div>
    <div style={{display:"flex",gap:8}}>
      {["Y1","Y2","Y3","Y4","Y5"].map(yr=>{
        const count=activePlayers.filter(p=>p.year===yr).length; const yc=YEAR_CFG[yr];
        return <div key={yr} onClick={()=>onFilterYear&&onFilterYear(yr)}
          style={{flex:1,background:T.bgCard,border:`1px solid ${yc.color}22`,borderRadius:8,padding:"12px",textAlign:"center",cursor:onFilterYear?"pointer":"default",transition:"all 0.15s"}}
          onMouseEnter={e=>{if(onFilterYear){e.currentTarget.style.background=`${yc.color}12`;e.currentTarget.style.borderColor=`${yc.color}44`;}}}
          onMouseLeave={e=>{e.currentTarget.style.background=T.bgCard;e.currentTarget.style.borderColor=`${yc.color}22`;}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:yc.color,fontWeight:700,letterSpacing:0.5,marginBottom:4}}>{yr}</div>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:yc.color}}>{count}</div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginTop:2}}>{yc.label}</div>
          {onFilterYear&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:yc.color,opacity:0.6,marginTop:4,letterSpacing:0.5}}>VIEW →</div>}
        </div>;
      })}
    </div>
  </div>;
}

// ─── ABOUT TAB HELPERS ───────────────────────────────────────────────────────

function AboutSection({id, title, label, children, openSection, setOpenSection, T}){
  const open = openSection === id;
  return (
    <div style={{background:T.bgCard, border:`1px solid ${open ? "rgba(0,230,118,0.25)" : T.border}`, borderRadius:10, overflow:"hidden", marginBottom:8, transition:"border-color 0.2s"}}>
      <div onClick={()=>setOpenSection(open ? null : id)} style={{display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", cursor:"pointer", userSelect:"none"}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.accent, letterSpacing:1.5, background:"rgba(0,230,118,0.08)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:4, padding:"2px 7px"}}>{label}</span>
          <span style={{fontFamily:"'Playfair Display',serif", fontSize:11, fontWeight:700, color:T.textPrimary}}>{title}</span>
        </div>
        <span style={{fontFamily:"'DM Mono',monospace", fontSize:11, color:T.textFaint, transition:"transform 0.2s", display:"inline-block", transform:open?"rotate(180deg)":"rotate(0deg)"}}>▾</span>
      </div>
      {open && <div style={{padding:"0 18px 18px 18px"}}>{children}</div>}
    </div>
  );
}

function AboutChip({label, color="#00e676", T}){
  return <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, padding:"3px 9px", borderRadius:5, background:`${color}18`, color:color, border:`1px solid ${color}40`}}>{label}</span>;
}

function AboutRow({label, value, color, sub=null, T}){
  const c = color || T.textSecondary;
  return (
    <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", padding:"7px 0", borderBottom:`1px solid ${T.borderHr}`}}>
      <div>
        <span style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted}}>{label}</span>
        {sub && <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textFaint, marginLeft:8}}>{sub}</span>}
      </div>
      <span style={{fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, color:c}}>{value}</span>
    </div>
  );
}

function AboutTab(){
  const mode=useTheme(); const T=THEMES[mode];
  const [openSection, setOpenSection] = useState("northscore");

  const sProps = {openSection, setOpenSection, T};

  return <div style={{maxWidth:860}}>

    {/* ── Hero ──────────────────────────────────────────────── */}
    <div style={{background:"linear-gradient(135deg,rgba(26,107,60,0.12),rgba(13,79,44,0.06))", border:"1px solid rgba(0,230,118,0.15)", borderRadius:12, padding:"28px 32px", marginBottom:20}}>
      <div style={{display:"flex", alignItems:"flex-start", gap:20, flexWrap:"wrap"}}>
        <div style={{width:48, height:48, borderRadius:12, background:"linear-gradient(135deg,#1a6b3c,#0d4f2c)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:"0 0 24px rgba(0,230,118,0.25)"}}>🌲</div>
        <div style={{flex:1, minWidth:260}}>
          <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.accent, letterSpacing:2, marginBottom:6}}>BOREAL ANALYTICS</div>
          <h1 style={{fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:800, color:T.textPrimary, margin:"0 0 8px 0", lineHeight:1.1}}>Where the North<br/>meets the game.</h1>
          <p style={{fontFamily:"'DM Mono',monospace", fontSize:11, color:T.textSecondary, lineHeight:1.8, margin:"0 0 14px 0", maxWidth:520}}>
            Boreal is a U SPORTS → NCAA D1 transfer intelligence platform. It surfaces the Canadian players most likely to succeed in American college basketball — ranked by NorthScore™, a composite metric built from scoring translation, system fit, positional demand, and eligibility context.
          </p>
          <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
            {[["73 prospects", T.accent], ["2 seasons", T.accentMid], ["30 target programs", "#4fc3f7"], ["4 U SPORTS conferences", "#ce93d8"]].map(([l,c])=><AboutChip T={T} key={l} label={l} color={c}/>)}
          </div>
        </div>
      </div>
    </div>

    {/* ── Sections ─────────────────────────────────────────── */}
    <AboutSection id="northscore" title="NorthScore™ — How It Works" label="FORMULA" {...sProps}>
      <p style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted, lineHeight:1.8, marginBottom:16}}>
        NorthScore™ is Boreal's composite transfer prospect rating. It combines four independent components, each scored 0–100, into a single number that reflects a player's overall transfer value to NCAA D1 programs. A score above 63 is elite. Most placeable prospects sit between 50 and 70.
      </p>

      {/* Formula visual */}
      <div style={{background:T.bg, border:`1px solid ${T.borderHr}`, borderRadius:8, padding:"16px 20px", marginBottom:16}}>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textLabel, letterSpacing:1.5, marginBottom:12}}>NS = (STAT × 30%) + (FIT × 25%) + (DEMAND × 25%) + (CONTEXT × 20%)</div>
        <div style={{display:"grid", gap:8}}>
          {[
            {label:"STAT SCORE", pct:"30%", color:"#4fc3f7", desc:"SOS-adjusted PPG, normalised across all 125 tracked U SPORTS players. OUA Top-6 = 1.00× · OUA Other/RSEQ = 0.90× · CW Top-4 = 0.85× · CW Other = 0.80× · AUS = 0.75×"},
            {label:"PACE & SYSTEM FIT", pct:"25%", color:"#ce93d8", desc:"Pace differential vs. target NCAA programs (45%) + system tag compatibility matrix (55%). Transition player to Transition school = near-perfect fit."},
            {label:"POSITIONAL DEMAND", pct:"25%", color:"#ff8a65", desc:"Open roster slots at Boreal's 30 target programs. Guard: 62.7 · Forward: 29.3 · Center: 14.0. Guards have 4× more open slots than centers — a structural advantage."},
            {label:"CONTEXTUAL FACTORS", pct:"20%", color:T.accent, desc:"Eligibility score (60% of this component): Y1=100, Y2=80, Y3=60, Y4=40, Y5=20. Context score (40%): conference proximity bonus + SOS tier lift."},
          ].map(c=>(
            <div key={c.label} style={{display:"flex", gap:12, alignItems:"flex-start"}}>
              <div style={{flexShrink:0, width:60, textAlign:"right"}}>
                <div style={{fontFamily:"'Playfair Display',serif", fontSize:11, fontWeight:700, color:c.color, lineHeight:1}}>{c.pct}</div>
                <div style={{fontFamily:"'DM Mono',monospace", fontSize:11, color:T.textFaint, letterSpacing:0.5, marginTop:1}}>{c.label}</div>
              </div>
              <div style={{flex:1, minWidth:0, paddingLeft:12, borderLeft:`2px solid ${c.color}40`}}>
                <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textSecondary, lineHeight:1.7}}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score tiers */}
      <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textLabel, letterSpacing:1.5, marginBottom:8}}>SCORE TIERS</div>
      <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
        {[["63+","Elite — D1 offer realistic","#00e676"],["55–62","Strong — strong mid-major target","#69f0ae"],["48–54","Solid — conference or low D1","#69f0ae"],["<48","Developmental","#a8d5a2"]].map(([r,l,c])=>(
          <div key={r} style={{background:T.bgChip, border:`1px solid ${c}30`, borderRadius:7, padding:"8px 12px", minWidth:130}}>
            <div style={{fontFamily:"'Playfair Display',serif", fontSize:12, fontWeight:700, color:c, marginBottom:2}}>{r}</div>
            <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textFaint, lineHeight:1.5}}>{l}</div>
          </div>
        ))}
      </div>
    </AboutSection>

    <AboutSection id="tabs" title="How to Use Each Tab" label="NAVIGATION" {...sProps}>
      <div style={{display:"grid", gap:10}}>
        {[
          {tab:"PROSPECTS", icon:"📊", desc:"The main scouting board. Ranked by NorthScore™. Use filters (year, position, system, recruiting status) to narrow your list. Click a player to open the full profile — NorthScore breakdown, stats, top 3 NCAA fits, and the Recruitment Tracker. The STATUS button on every card sets recruiting stage and automatically feeds the Pipeline tab."},
          {tab:"SCHOOLS", icon:"🏫", desc:"30 Boreal target NCAA programs with KenPom data, roster needs, Canadian history, and system tags. Sort by '26-27 slots, Canadian history, net rating, or KenPom rank. Roster bars show returning players vs. open needs by position. Use '📍 Target' to tag specific prospects against schools."},
          {tab:"PIPELINE", icon:"⬆", desc:"Your personal recruiting tracker. Players flow in automatically when you set a STATUS on any player card — no manual entry required. Track prospects through Watchlist → Shortlisted → Contacted → Offer Out → Verbal → Signed. Per-player checklists and an activity log persist across sessions. Past U SPORTS → NCAA transfers are archived at the bottom for reference."},
          {tab:"ELIGIBILITY", icon:"📅", desc:"U SPORTS year → NCAA eligibility reference. Y1 = 4 NCAA seasons remaining, Y2 = 3, Y3 = 2, Y4 = 1 (most common transfer profile), Y5 = grad transfer only. Click any year tile to filter the Prospects board to that cohort."},
          {tab:"GLOSSARY", icon:"📖", desc:"Full definitions for every term in the platform — NorthScore™ formula, SOS multipliers, conference abbreviations, NCAA metrics (KenPom, AdjT, Net Rating), portal terminology, and recruiting statuses. Searchable and filterable by section."},
        ].map(t=>(
          <div key={t.tab} style={{display:"flex", gap:12, alignItems:"flex-start", padding:"12px 14px", background:T.bg, border:`1px solid ${T.borderHr}`, borderRadius:8}}>
            <div style={{fontSize:11, flexShrink:0, marginTop:2}}>{t.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, fontWeight:700, color:T.accent, letterSpacing:1.5, marginBottom:4}}>{t.tab}</div>
              <div style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted, lineHeight:1.75}}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </AboutSection>

    <AboutSection id="crm" title="Recruitment Tracker — CRM" label="WORKFLOW" {...sProps}>
      <p style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted, lineHeight:1.8, marginBottom:14}}>
        Every player has a Recruitment Tracker built into their profile. Data is stored locally in your browser — no login required.
      </p>
      <div style={{display:"grid", gap:7, marginBottom:14}}>
        <AboutRow T={T} label="Status" value="7 stages" sub="Watchlist → Shortlisted → Contacted → Offer Out → Verbal → Signed → Pass"/>
        <AboutRow T={T} label="Interest rating" value="★★★★★" sub="1–5 star internal priority flag" color="#ffd700"/>
        <AboutRow T={T} label="Scout notes" value="Free text" sub="Observations, fit notes, relationship context — persistent"/>
        <AboutRow T={T} label="Contact log" value="Per entry" sub="Date, method (Email / Phone / Social / In Person / Agent / Video Call), notes"/>
        <AboutRow T={T} label="Filter by status" value="Board filter" sub="Use 'All Statuses' dropdown on Prospects tab to filter board by CRM stage"/>
      </div>
      <div style={{background:"rgba(0,230,118,0.04)", border:"1px solid rgba(0,230,118,0.12)", borderRadius:8, padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.accent, letterSpacing:1, marginBottom:5}}>TIP</div>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textMuted, lineHeight:1.7}}>Use the CRM status filter on the Prospects board to quickly pull up only "Shortlisted" or "Contacted" players during a recruiting call. The board border color reflects each player's status — green = active conversation, red = pass.</div>
      </div>
    </AboutSection>

    <AboutSection id="portal" title="Spring Portal Workflow" label="PORTAL" {...sProps}>
      <p style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted, lineHeight:1.8, marginBottom:14}}>
        The NCAA spring transfer portal window runs <span style={{color:T.accent, fontWeight:700}}>April 7 – April 21, 2026</span>. This is the primary window for U SPORTS players finishing their season to declare.
      </p>
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14}}>
        {[
          {step:"01", label:"Pre-window (now)", desc:"Finalize board, review film, make initial contact, confirm NCAA EC docs"},
          {step:"02", label:"Player declares", desc:"Player enters portal — set their STATUS to 'Contacted' or higher on their card and they instantly appear in your Pipeline tab"},
          {step:"03", label:"Track status", desc:"Advance through Watchlist → Shortlisted → Contacted → Offer Out → Verbal → Signed directly from the player card. Pipeline tab shows the full picture."},
          {step:"04", label:"Per-player checklist", desc:"6-item recruiting checklist per player (film, contact, eligibility, fit schools, coach briefed) — accessible from the Pipeline tab"},
        ].map(s=>(
          <div key={s.step} style={{background:T.bg, border:`1px solid ${T.borderHr}`, borderRadius:8, padding:"12px 14px"}}>
            <div style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.accent, fontWeight:700, marginBottom:4}}>{s.step} · {s.label}</div>
            <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textMuted, lineHeight:1.6}}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(255,224,130,0.05)", border:"1px solid rgba(255,224,130,0.2)", borderRadius:8, padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.accent, letterSpacing:1, marginBottom:5}}>ELIGIBILITY RULE</div>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textMuted, lineHeight:1.7}}>All NCAA transfers receive immediate eligibility — no sitting-out year required. U SPORTS players must clear the NCAA Eligibility Center (4–8 weeks). Y4 and Y5 players are time-sensitive: coach outreach should begin before the portal window opens.</div>
      </div>
    </AboutSection>

    <AboutSection id="methodology" title="Data Sources & Methodology" label="METHODOLOGY" {...sProps}>
      <div style={{display:"grid", gap:7, marginBottom:14}}>
        <AboutRow T={T} label="Player stats" value="U SPORTS / estimated" sub="usports.ca for verified leaders · remainder estimated from scouting context"/>
        <AboutRow T={T} label="Verified badge" value="✓ VRF" sub="Cross-checked against official U SPORTS 2024-25 leaders page" color="#69f0ae"/>
        <AboutRow T={T} label="NCAA roster data" value="ESPN 2025-26" sub="Open slots derived from senior departures and known portal entries"/>
        <AboutRow T={T} label="KenPom data" value="2024-25 season" sub="AdjT, net rating, SOS net — used in Schools tab and Fit calculations · ⚠ Update scheduled post-portal (after Apr 21, 2026) once 2025-26 season and portal window are complete"/>
        <AboutRow T={T} label="Canadian roster history" value="basketballbuzz.ca + Boreal" sub="CA field = Canadians on 2024-25 NCAA roster (most recent available)"/>
        <AboutRow T={T} label="System tags" value="Boreal internal" sub="7-tag taxonomy applied to both U SPORTS and NCAA programs"/>
        <AboutRow T={T} label="Fit scores" value="Boreal algorithm" sub="Player fit1/fit2/fit3 schools calculated against all 30 target programs"/>
      </div>
      <div style={{background:"rgba(100,100,100,0.05)", border:`1px solid ${T.borderHr}`, borderRadius:8, padding:"10px 14px"}}>
        <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textLabel, letterSpacing:1, marginBottom:5}}>VERIFICATION STATUS</div>
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          <div style={{display:"flex", alignItems:"center", gap:5}}>
            <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:"#69f0ae", background:"rgba(105,240,174,0.1)", border:"1px solid rgba(105,240,174,0.3)", borderRadius:3, padding:"1px 5px", fontWeight:700}}>✓ VRF</span>
            <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textMuted}}>Confirmed from official U SPORTS records</span>
          </div>
          <div style={{display:"flex", alignItems:"center", gap:5}}>
            <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:"#ffb74d", background:"rgba(255,183,77,0.08)", border:"1px solid rgba(255,183,77,0.25)", borderRadius:3, padding:"1px 5px", fontWeight:600}}>EST</span>
            <span style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textMuted}}>Estimated from scouting context — treat as approximate</span>
          </div>
        </div>
      </div>
    </AboutSection>

    <AboutSection id="bo" title="Bo — AI Scouting Analyst" label="AI" {...sProps}>
      <div style={{display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap"}}>
        <div style={{width:44, height:44, borderRadius:10, background:"linear-gradient(135deg,#1a6b3c,#0d4f2c)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0}}>🌲</div>
        <div style={{flex:1, minWidth:240}}>
          <div style={{fontFamily:"'DM Mono',monospace", fontSize:13, color:T.textMuted, lineHeight:1.75, marginBottom:12}}>
            Bo is Boreal's AI scouting analyst — powered by Claude. It has access to the full player database, all NorthScore™ components, NCAA target programs, and pipeline data. Use it to get player comparisons, fit breakdowns, matchup analysis, or dig into why a specific player ranks where they do.
          </div>
          <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textLabel, letterSpacing:1, marginBottom:8}}>EXAMPLE QUERIES</div>
          <div style={{display:"grid", gap:5}}>
            {[
              "Who are the top 3 guards available this spring window?",
              "Compare D.J. Jackson and Keon Baker for a MAC program",
              "Which players fit a fast-paced transition system?",
              "Why is Jasha'jaun Downey ranked higher than his PPG suggests?",
              "What are the best fits for a Y2 guard from AUS?",
            ].map(q=>(
              <div key={q} style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textSecondary, background:T.bgChip, borderRadius:5, padding:"6px 10px", border:`1px solid ${T.borderHr}`}}>
                "{q}"
              </div>
            ))}
          </div>
          <div style={{marginTop:12, fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textFaint}}>
          </div>
        </div>
      </div>
    </AboutSection>

    {/* Footer note */}
    <div style={{marginTop:16, padding:"12px 16px", background:T.bgCard, border:`1px solid ${T.borderHr}`, borderRadius:8, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8}}>
      <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textFaint, letterSpacing:0.5}}>
        BOREAL ANALYTICS · NorthScore™ · 2024-25 & 2025-26 U SPORTS
      </div>
      <div style={{fontFamily:"'DM Mono',monospace", fontSize:12, color:T.textGhost}}>
        Data: KenPom · usports.ca · basketballbuzz.ca · ESPN · Boreal internal research
      </div>
    </div>

  </div>;
}

function GlossaryTab(){
  const mode=useTheme(); const T=THEMES[mode];
  const [search,setSearch] = useState("");
  const [activeSection,setActiveSection] = useState("ALL");

  const SECTION_COLORS = {
    "Formula":              "#ce93d8",
    "Strength of Schedule": "#ff8a65",
    "Transfer Portal":      "#4fc3f7",
    "Conferences":          T.accentMid,
    "Metrics": "#69f0ae",
  };
  const sections = ["ALL", ...Object.keys(SECTION_COLORS)];

  const filtered = GLOSSARY_ITEMS.filter(g=>{
    const matchSearch = !search || g.term.toLowerCase().includes(search.toLowerCase()) || g.def.toLowerCase().includes(search.toLowerCase());
    const matchSection = activeSection==="ALL" || g.section===activeSection;
    return matchSearch && matchSection;
  });

  const grouped = sections.filter(s=>s!=="ALL").reduce((acc,s)=>{
    const items = filtered.filter(g=>g.section===s);
    if(items.length>0) acc[s]=items;
    return acc;
  },{});

  return <div>
    <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search glossary..." style={{background:T.bgInput,border:`1px solid ${T.borderInput}`,borderRadius:8,padding:"8px 14px",color:T.textPrimary,fontSize:11,outline:"none",width:"100%",fontFamily:"'DM Mono',monospace",marginBottom:12,boxSizing:"border-box"}}/>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
      {sections.map(s=>{
        const col = s==="ALL" ? T.textPrimary : SECTION_COLORS[s];
        const active = activeSection===s;
        return <button key={s} onClick={()=>setActiveSection(s)} style={{background:active?`${col}18`:T.bgCard,border:`1px solid ${active?col+"55":T.borderMid}`,borderRadius:16,padding:"5px 13px",color:active?col:T.textMuted,fontSize:13,cursor:"pointer",fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.15s"}}>{s.toUpperCase()}</button>;
      })}
    </div>
    {Object.entries(grouped).map(([section, items])=>(
      <div key={section} style={{marginBottom:28}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <div style={{width:3,height:16,borderRadius:2,background:SECTION_COLORS[section]}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:SECTION_COLORS[section],letterSpacing:2,fontWeight:600}}>{section.toUpperCase()}</span>
        </div>
        <div style={{display:"grid",gap:7}}>
          {items.map(g=>(
            <div key={g.term} style={{background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:9,padding:"14px 18px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:600,color:SECTION_COLORS[g.section]||"#7dd3a8",letterSpacing:0.3,marginBottom:8}}>{g.term}</div>
              <div style={{fontFamily:"'Georgia',serif",fontSize:12,color:T.textSecondary,lineHeight:1.75,whiteSpace:"pre-line"}}>{g.def}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
    {filtered.length===0&&<div style={{textAlign:"center",padding:40,fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint}}>No results found.</div>}
  </div>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────


// ─── COMPARE TAB ──────────────────────────────────────────────────────────────
function CmpW(a,b,k,low){var va=a?.[k],vb=b?.[k];if(va==null||vb==null)return null;return low?(va<vb?"A":va>vb?"B":"tie"):(va>vb?"A":va<vb?"B":"tie");}
function CmpHead({l,T}){return <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:2,padding:"8px 0 3px",marginTop:4}}>{l}</div>;}
function CmpRow({label,k,pA,pB,fmt,low,T}){
  var va=pA?.[k],vb=pB?.[k],w=CmpW(pA,pB,k,low);
  var fv=function(v){return v==null?"—":fmt?fmt(v):v;};
  var aW=w==="A",bW=w==="B";
  return <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",alignItems:"center",padding:"5px 0",borderBottom:"1px solid "+T.borderHr}}>
    <div style={{textAlign:"right"}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:aW?13:11,fontWeight:aW?700:400,color:aW?T.accent:T.textSecondary,background:aW?"rgba(0,230,118,0.08)":"transparent",padding:aW?"2px 8px":"0",borderRadius:4}}>{fv(va)}</span></div>
    <div style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint}}>{label}</div>
    <div><span style={{fontFamily:"'DM Mono',monospace",fontSize:bW?13:11,fontWeight:bW?700:400,color:bW?"#4fc3f7":T.textSecondary,background:bW?"rgba(79,195,247,0.08)":"transparent",padding:bW?"2px 8px":"0",borderRadius:4}}>{fv(vb)}</span></div>
  </div>;
}
function CompareTab({compareSlot,setCompareSlot,allPlayers}){
  var mode=useTheme();var T=THEMES[mode];
  var pA=compareSlot[0],pB=compareSlot[1];
  var opts=allPlayers.map(function(p){return Object.assign({},p,{key:(p.season||"2024-25")+"-"+p.rank});});
  function pick(slot,key){var f=key?opts.find(function(x){return x.key===key;}):null;setCompareSlot(function(prev){return slot===0?[f,prev[1]]:[prev[0],f];});}
  function sr(label,k,fmt,low){return <CmpRow label={label} k={k} pA={pA} pB={pB} fmt={fmt} low={low} T={T}/>;}
  function sh(l){return <CmpHead l={l} T={T}/>;}
  var aW=0,bW=0;
  ["ns","stat","fit","elig","demand","ppg","rpg","apg","fgp","tpp","ftp","spg","bpg"].forEach(function(k){var w=CmpW(pA,pB,k);if(w==="A")aW++;else if(w==="B")bW++;});
  var sel=function(slot,p){return <div style={{flex:1}}>
    <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,letterSpacing:1.5,marginBottom:4}}>{slot===0?"PLAYER A":"PLAYER B"}</div>
    <select value={p?(p.season||"2024-25")+"-"+p.rank:""} onChange={function(e){pick(slot,e.target.value);}} style={{width:"100%",background:T.bgInput,border:"1px solid "+(p?T.accent:T.borderInput),borderRadius:8,padding:"8px 12px",color:p?T.textPrimary:T.textMuted,fontSize:11,fontFamily:"'DM Mono',monospace",outline:"none"}}>
      <option value="">— Select player —</option>
      {["2025-26","2024-25"].map(function(s){return <optgroup key={s} label={s}>{opts.filter(function(x){return (x.season||"2024-25")===s;}).sort(function(a,b){return a.rank-b.rank;}).map(function(x){return <option key={x.key} value={x.key}>{"#"+x.rank+" "+x.name+" · "+x.team+" · NS "+x.ns}</option>;})}</optgroup>;})}
    </select>
    {p&&<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textMuted,marginTop:4}}>{p.name+" · "+p.team+" · "+p.year+" · "+p.pos}</div>}
  </div>;};
  return <div style={{maxWidth:820,margin:"0 auto"}}>
    <div style={{display:"flex",gap:12,alignItems:"flex-end",marginBottom:16}}>
      {sel(0,pA)}
      <div style={{padding:"0 8px 8px",fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,flexShrink:0}}>vs</div>
      {sel(1,pB)}
      {pA&&pB&&<button onClick={function(){setCompareSlot([pB,pA]);}} style={{padding:"8px",background:"transparent",border:"1px solid "+T.border,borderRadius:6,color:T.textMuted,cursor:"pointer",flexShrink:0,marginBottom:2}}>⇅</button>}
    </div>
    {(!pA||!pB)&&<div style={{textAlign:"center",padding:"60px 20px",fontFamily:"'DM Mono',monospace",fontSize:11,color:T.textFaint}}>Select two players to compare.</div>}
    {pA&&pB&&<div style={{background:T.bgCard,border:"1px solid "+T.border,borderRadius:12,padding:"16px 20px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",marginBottom:8}}>
        <div style={{textAlign:"right",fontFamily:"'DM Mono',monospace",fontSize:12,color:T.accent,fontWeight:700}}>{pA.name.split(" ")[0].toUpperCase()}</div>
        <div/>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#4fc3f7",fontWeight:700}}>{pB.name.split(" ")[0].toUpperCase()}</div>
      </div>
      {sh("NORTHSCORE™")}{sr("NS","ns",function(v){return v.toFixed(1);})}
      {sr("STAT","stat",function(v){return v.toFixed(1);})}
      {sr("FIT","fit",function(v){return v.toFixed(1);})}
      {sr("ELIG","elig",function(v){return v;})}
      {sr("DEMAND","demand",function(v){return v.toFixed(1);})}
      {sh("STATS")}{sr("PPG","ppg",function(v){return v.toFixed(1);})}
      {sr("RPG","rpg",function(v){return v.toFixed(1);})}
      {sr("APG","apg",function(v){return v.toFixed(1);})}
      {sh("SHOOTING")}{sr("FG%","fgp",function(v){return v+"%";})}
      {sr("3PT%","tpp",function(v){return v+"%";})}
      {sr("FT%","ftp",function(v){return (v!=null&&v!==0)?v+"%":"—";})}
      {sh("DEFENCE")}{sr("SPG","spg",function(v){return v.toFixed(1);})}
      {sr("BPG","bpg",function(v){return v.toFixed(1);})}
      {sr("TOV","tov",function(v){return v.toFixed(1);},true)}
      <div style={{display:"grid",gridTemplateColumns:"1fr 80px 1fr",marginTop:12,paddingTop:10,borderTop:"1px solid "+T.borderMid}}>
        <div style={{textAlign:"right"}}><span style={{fontFamily:"'DM Mono',monospace",fontSize:aW>bW?18:13,fontWeight:700,color:aW>bW?T.accent:T.textMuted}}>{aW}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginLeft:3}}>cats</span></div>
        <div style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,paddingTop:4}}>EDGE</div>
        <div><span style={{fontFamily:"'DM Mono',monospace",fontSize:bW>aW?18:13,fontWeight:700,color:bW>aW?"#4fc3f7":T.textMuted}}>{bW}</span><span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:T.textFaint,marginLeft:3}}>cats</span></div>
      </div>
      
    </div>}
  </div>;
}

const TABS = [
  {id:"prospects",  label:"Prospects"},
  {id:"schools",    label:"Schools"},
  {id:"compare",    label:"Compare"},
  {id:"pipeline",   label:"Pipeline"},
  {id:"eligibility",label:"Eligibility"},
  {id:"glossary",   label:"Glossary"},
  {id:"about",      label:"About"}];

export default function BorealApp(){

  const [tab,setTab] = useState("prospects");
  const [mode,setMode] = useState("light");
  const [activeSeason, setActiveSeason] = useState("2025-26");
  const [isMobile, setIsMobile] = useState(()=>window.innerWidth < 768);
  const activePlayers = activeSeason === "2025-26" ? PLAYERS_2526 : PLAYERS_2425;
  const [compareSlot, setCompareSlot] = useState([null, null]);
  const allPlayers = [...PLAYERS_2425, ...PLAYERS_2526];
  const [watchlistEntries, setWatchlistEntries] = useState([]);
  const [watchlistStorageReady, setWatchlistStorageReady] = useState(false);
  const [eligYearFilter, setEligYearFilter] = useState(null); // set by EligibilityTab click, consumed by ProspectsTab

  // Load watchlist from storage on mount — lives here so it persists across all tabs
  useEffect(()=>{
    (async()=>{
      try{
        const r = (()=>{ try{ const _v=localStorage.getItem("pipeline:watchlist"); return _v?{value:_v}:null; }catch(e){ return null; } })();
        if(r?.value){ const saved = JSON.parse(r.value); if(Array.isArray(saved)) setWatchlistEntries(saved); }
      }catch(e){}
      setWatchlistStorageReady(true);
    })();
  },[]);

  // Save watchlist whenever it changes (after initial load)
  useEffect(()=>{
    if(!watchlistStorageReady) return;
    try{ localStorage.setItem("pipeline:watchlist",JSON.stringify(watchlistEntries)); }catch(e){}
  },[watchlistEntries, watchlistStorageReady]);

  // Stable ref so __pipelineSync always sees current watchlist without re-registering
  const watchlistRef = useRef(watchlistEntries);
  useEffect(()=>{ watchlistRef.current = watchlistEntries; },[watchlistEntries]);

  // CRM status buttons on player cards drive the pipeline via __pipelineSync
  useEffect(()=>{
    window.__pipelineSync = (prospect, pipelineStatus) => {
      if(pipelineStatus === null) {
        setWatchlistEntries(prev => prev.filter(e => !(e.name===prospect.name && e.season===(prospect.season||"2025-26"))));
        return;
      }
      setWatchlistEntries(prev => {
        const existing = prev.find(e => e.name===prospect.name && e.season===(prospect.season||"2025-26"));
        if(existing) {
          const curOrder = STATUS_CONFIG[existing.status]?.order || 0;
          const newOrder = STATUS_CONFIG[pipelineStatus]?.order || 0;
          if(newOrder >= curOrder) return prev.map(e => e.id===existing.id ? {...e, status:pipelineStatus} : e);
          return prev;
        }
        return [...prev, {
          ...BLANK_ENTRY,
          id: `entry-${Date.now()}`,
          name: prospect.name,
          from: prospect.team,
          year: prospect.year,
          pos: prospect.pos,
          ht: prospect.ht||"",
          sys: prospect.sys||"",
          ns: prospect.ns,
          to: "",
          status: pipelineStatus,
          season: prospect.season||"2025-26",
          entered: new Date().toISOString().split("T")[0],
          note: `NS ${prospect.ns} · Top fits: ${[prospect.fit1,prospect.fit2,prospect.fit3].filter(Boolean).join(", ")}`,
          boardRank: prospect.rank,
        }];
      });
    };
    return ()=>{ delete window.__pipelineSync; };
  },[]);  // registers once — uses setWatchlistEntries functional updater, no stale closure

  // Responsive listener
  useEffect(()=>{
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  },[]);

  // Persist theme preference
  useEffect(()=>{
    (async()=>{ try{ const r=(()=>{ try{ const _v=localStorage.getItem("boreal:theme"); return _v?{value:_v}:null; }catch(e){ return null; } })(); if(r?.value) setMode(r.value); }catch(e){} })();
  },[]);
  const toggleMode = async () => {
    const next = mode==="light"?"dark":"light";
    setMode(next);
    try{ localStorage.setItem("boreal:theme",next); }catch(e){}
  };
  const openCompare=(p)=>{setCompareSlot(prev=>(!prev[0]?[p,prev[1]]:!prev[1]?[prev[0],p]:[prev[0],p]));setTab("compare");};

  const T = THEMES[mode];
  const px = isMobile ? "14px" : "32px"; // responsive horizontal padding


  return (
    <ThemeContext.Provider value={mode}>
    <div style={{minHeight:"100vh",background:T.bg,color:T.textPrimary,fontFamily:"'DM Mono',monospace",backgroundImage:T.bgGrad,transition:"background 0.3s,color 0.3s"}}>
      <div id="boreal-root" style={{maxWidth:"1080px",margin:"0 auto",display:"flex",flexDirection:"column",minHeight:"100vh",position:"relative"}}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeOverlay { from { opacity:0; } to { opacity:1; } }

        /* ── Global density & sizing fixes for full browser viewport ── */
        *, *::before, *::after { box-sizing: border-box; }

        /* Player card hover */
        .player-card-row:hover { cursor: pointer; }

        /* Hide scrollbars but keep scroll */
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
      `}</style>

      {/* ── Header ── */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:`12px ${px}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,background:T.bgHeader,gap:8}}>
        {/* Logo */}
        <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
            {/* Outer circle */}
            <circle cx="40" cy="40" r="37" stroke="#3d7a52" strokeWidth="2"/>
            {/* Globe horizontal line */}
            <line x1="13" y1="54" x2="67" y2="54" stroke="#3d7a52" strokeWidth="1.4" strokeOpacity="0.55"/>
            {/* Globe vertical line */}
            <line x1="40" y1="32" x2="40" y2="75" stroke="#3d7a52" strokeWidth="1.4" strokeOpacity="0.55"/>
            {/* Globe arc */}
            <path d="M13 54 Q40 30 67 54" fill="none" stroke="#3d7a52" strokeWidth="1.4" strokeOpacity="0.55"/>
            {/* Globe outer circle (lower portion) */}
            <circle cx="40" cy="54" r="21" fill="none" stroke="#3d7a52" strokeWidth="1.4" strokeOpacity="0.55"/>
            {/* Tree — trunk outline */}
            <rect x="37" y="50" width="6" height="9" rx="1" fill="none" stroke={T?.textPrimary||"#ffffff"} strokeWidth="1.5" strokeLinejoin="round"/>
            {/* Tree — bottom tier outline */}
            <polygon points="40,42 27,55 53,55" fill="none" stroke={T?.textPrimary||"#ffffff"} strokeWidth="1.5" strokeLinejoin="round"/>
            {/* Tree — mid tier outline */}
            <polygon points="40,30 29,44 51,44" fill="none" stroke={T?.textPrimary||"#ffffff"} strokeWidth="1.5" strokeLinejoin="round"/>
            {/* Tree — top tier outline */}
            <polygon points="40,14 31,32 49,32" fill="none" stroke={T?.textPrimary||"#ffffff"} strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:isMobile?15:18,fontWeight:800,letterSpacing:0.4,lineHeight:1,color:T.textPrimary}}>BOREAL</div>
            {!isMobile&&<div style={{fontSize:12,color:T.textMuted,letterSpacing:1.5,marginTop:3}}>WHERE THE NORTH MEETS THE GAME</div>}
          </div>
        </div>

        {/* Controls */}
        <div style={{display:"flex",alignItems:"center",gap:isMobile?6:12,flexWrap:"nowrap"}}>
          {/* Prospect count — hide on smallest mobile */}
          {!isMobile&&(
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:T.accent,boxShadow:`0 0 7px ${T.accent}`}}/>
              <span style={{fontSize:12,color:T.textLabel,letterSpacing:1,whiteSpace:"nowrap"}}>{activeSeason} · {activePlayers.length} PROSPECTS</span>
            </div>
          )}

          {/* Season toggle */}
          <div style={{display:"flex",alignItems:"center",gap:3,background:T.bgCard,border:`1px solid ${T.border}`,borderRadius:14,padding:"2px 3px",flexShrink:0}}>
            {["2024-25","2025-26"].map(s=>(
              <button key={s} onClick={()=>setActiveSeason(s)} style={{
                fontFamily:"'DM Mono',monospace",fontSize:isMobile?7:8,fontWeight:700,letterSpacing:0.3,
                padding:isMobile?"3px 7px":"3px 10px",borderRadius:11,border:"none",
                background:activeSeason===s?T.accentBg:"transparent",
                color:activeSeason===s?T.accent:T.textMuted,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"
              }}>{isMobile?s.replace("20","'"):s}</button>
            ))}
          </div>

          {/* Theme toggle */}
          <button onClick={toggleMode}
            style={{display:"flex",alignItems:"center",gap:4,background:T.toggleBg,border:`1px solid ${T.toggleBorder}`,borderRadius:18,padding:isMobile?"5px 9px":"5px 11px",color:T.toggleText,cursor:"pointer",fontSize:isMobile?11:9,fontFamily:"'DM Mono',monospace",letterSpacing:0.5,transition:"all 0.2s",flexShrink:0}}>
            {mode==="light" ? <>🌙{!isMobile&&" Night"}</> : <>☀️{!isMobile&&" Light"}</>}
          </button>

          </div>
      </div>

      {/* ── Nav tabs ── */}
      <div style={{borderBottom:`1px solid ${T.border}`,padding:`0 ${px}`,display:"flex",gap:0,background:T.bgHeader,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:tab===t.id?T.bgTabActive:"transparent",border:"none",
            borderBottom:`2px solid ${tab===t.id?T.borderTabActive:"transparent"}`,
            padding:isMobile?"10px 12px":"12px 16px",
            color:tab===t.id?T.accentText:T.textTabInactive,
            cursor:"pointer",fontSize:isMobile?9:10,fontFamily:"'DM Mono',monospace",
            letterSpacing:isMobile?0.3:0.8,transition:"all 0.15s",whiteSpace:"nowrap",flexShrink:0
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ── Body ── */}
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:0,transition:"grid-template-columns 0.3s ease"}}>
        <div style={{padding:isMobile?"16px 14px":`24px ${px}`,minWidth:0}}>
          {tab==="prospects"&&<ProspectsTab activePlayers={activePlayers} activeSeason={activeSeason} onCompare={openCompare} eligYearFilter={eligYearFilter} onClearEligFilter={()=>setEligYearFilter(null)}/>}
          {tab==="schools"&&<SchoolsTab activePlayers={activePlayers} activeSeason={activeSeason} onCompare={openCompare}/>}
          {tab==="compare"&&<CompareTab compareSlot={compareSlot} setCompareSlot={setCompareSlot} allPlayers={allPlayers}/>}
          {tab==="pipeline"&&<PipelineTab activePlayers={activePlayers} allPlayers={[...PLAYERS_2425,...PLAYERS_2526]} watchlistEntries={watchlistEntries} setWatchlistEntries={setWatchlistEntries}/>}
          {tab==="eligibility"&&<EligibilityTab activePlayers={activePlayers} onFilterYear={(yr)=>{ setEligYearFilter(yr); setTab("prospects"); }}/>}
          {tab==="glossary"&&<GlossaryTab/>}
          {tab==="about"&&<AboutTab/>}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{borderTop:`1px solid ${T.borderHr}`,padding:`12px ${px}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:T.bgHeader,flexWrap:"wrap",gap:4}}>
        <span style={{fontSize:12,color:T.textFaint,letterSpacing:1}}>BOREAL ANALYTICS · NORTHSCORE™ · {activeSeason} U SPORTS</span>
        {!isMobile&&<span style={{fontSize:12,color:T.textGhost,letterSpacing:0.5}}>KenPom · usports.ca · Boreal internal research</span>}
      </div>
      </div>
    </div>
    </ThemeContext.Provider>
  );
}
