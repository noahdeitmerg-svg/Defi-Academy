# Assets Input

Dieser Ordner nimmt die extern generierten Assets für jede Lektion auf:

- **`voice.mp3`** — die vom ElevenLabs-Agent gerenderte Tonspur der Lektion
- **`visuals/vNN.png`** — ein Bildasset pro Visual-ID aus `visual_plan.json`

## Struktur

```
assets-input/
├── module01-lesson01/
│   ├── voice.mp3
│   └── visuals/
│       ├── v01.png
│       ├── v02.png
│       └── ...
├── module01-lesson02/
│   ├── voice.mp3
│   └── visuals/
│       └── ...
└── ...
```

## Hinweise

- **Visual-IDs** (`v01`, `v02`, …) kommen aus `visual_plan.json` der jeweiligen
  Lektion. Der Asset-Resolver sucht exakt nach diesen IDs.
- **Akzeptierte Formate**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`.
- **Fehlende Dateien**: Werden als klar gekennzeichnete Platzhalter gerendert.
  Die Pipeline bricht nicht ab.
- **Audio-Länge**: Sollte ungefähr der `duration_seconds` aus `video_config.json`
  entsprechen. Ist das Audio deutlich länger, wird es am Ende abgeschnitten.
  Ist es kürzer, folgt Stille.
