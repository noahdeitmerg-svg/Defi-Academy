# Lesson Videos

Pro Lektion **optional** eine MP4-Datei ablegen. Wird automatisch erkannt
und oberhalb der Lesson als Video-Player gerendert.

## Namens-Konvention

```
public/videos/<moduleSlug>-<lessonSlug>.mp4
```

Beispiele:

```
public/videos/module1-1-1.mp4
public/videos/module6-6-3.mp4
public/videos/module13-13-4.mp4
```

`<moduleSlug>` und `<lessonSlug>` stammen direkt aus der URL der Lektion,
z. B. `/module/module6/lesson/6-3` → Datei `module6-6-3.mp4`.

**Neue UX-Lektion** (`/kurs/01-defi-grundlagen/01-was-ist-defi` usw.): dieselbe
Datei `module1-1-1.mp4` wird beim Build erkannt, sofern sie unter
`public/videos/` liegt (Zuordnung über `data/courseStructure` und
`lib/content/resolveUxLessonVideoUrl.ts`). Fehlt die Datei, wird
`NEXT_PUBLIC_VIDEO_CDN_URL/modules/<modulId>/<lektionId>.mp4` verwendet.

Passendes Posterbild (optional):

```
public/posters/<moduleSlug>-<lessonSlug>.jpg
```

## Fallback-Verhalten

Wenn keine Datei existiert, wird die Lesson weiterhin korrekt ohne
Video-Player gerendert. Kein Code-Change pro Lektion noetig.

## Hinweise

- Format: MP4 (H.264) empfohlen, `preload="metadata"` reduziert den
  initialen Payload
- Groesse: fuer GitHub Pages Hosting moeglichst unter ~50 MB pro Datei
- Fuer groessere Dateien spaeter auf externen Storage (R2/S3/Video-CDN)
  umstellen — dann `resolveLessonVideo` in `lib/lessonAssets.ts`
  entsprechend erweitern
