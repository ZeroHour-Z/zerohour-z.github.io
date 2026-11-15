// Releases on Netease Cloud Music (artist 33400424), newest first.
// Covers are stored in src/assets/music/<album id>.jpg. Add new releases at the top.
export type Release = {
  /** Netease album id */
  id: number
  name: string
  /** 专辑 / EP / Single */
  type: string
  date: string
  /** Tracks by ZeroHour on this release */
  tracks: string[]
  cover: string
}

export const releases: Release[] = [
  {
    id: 391893004,
    name: 'CITY SOUNDS Vol.6 / 长夜流光',
    type: '专辑',
    date: '2026-08-17',
    tracks: ['Watercooler talk'],
    cover: '391893004.jpg'
  },
  {
    id: 280906795,
    name: 'Watercooler talk',
    type: 'Single',
    date: '2025-08-08',
    tracks: ['Watercooler talk'],
    cover: '280906795.png'
  },
  {
    id: 273899125,
    name: '源乐之辉',
    type: 'EP',
    date: '2025-06-02',
    tracks: ['Morning'],
    cover: '273899125.jpg'
  },
  {
    id: 268350576,
    name: '春の季語',
    type: 'EP',
    date: '2025-04-05',
    tracks: ['Fantasy'],
    cover: '268350576.jpg'
  },
  {
    id: 265496770,
    name: '无机体',
    type: 'EP',
    date: '2025-03-15',
    tracks: ['Terapy'],
    cover: '265496770.jpg'
  },
  {
    id: 262570103,
    name: 'Beam（Poiuytr Remix）',
    type: 'Single',
    date: '2025-02-13',
    tracks: ['Beam（Poiuytr Remix）'],
    cover: '262570103.png'
  },
  {
    id: 262364966,
    name: 'Lo-fi Me',
    type: '专辑',
    date: '2025-02-11',
    tracks: ['Wistfulness'],
    cover: '262364966.jpg'
  },
  {
    id: 259676249,
    name: 'PHONO RECORDS VOL.4 PURE「青」',
    type: '专辑',
    date: '2025-01-19',
    tracks: ['Beam'],
    cover: '259676249.jpg'
  },
  {
    id: 247576818,
    name: 'Liquid Lights EP',
    type: '专辑',
    date: '2024-09-13',
    tracks: ['I still remember？'],
    cover: '247576818.jpg'
  },
  {
    id: 192569785,
    name: '那从前 Remixes Pt.2',
    type: 'EP',
    date: '2024-04-20',
    tracks: ['那从前（ZeroHour Remix）'],
    cover: '192569785.jpg'
  },
  {
    id: 173746369,
    name: 'Melodic Paradise EP',
    type: '专辑',
    date: '2023-09-01',
    tracks: ['Nebula'],
    cover: '173746369.jpg'
  },
  {
    id: 171327272,
    name: 'Ohu',
    type: 'Single',
    date: '2023-08-04',
    tracks: ['Ohu'],
    cover: '171327272.jpg'
  },
  {
    id: 157774999,
    name: 'Soul Notes Vol. 5',
    type: '专辑',
    date: '2023-01-13',
    tracks: ['Ethereal'],
    cover: '157774999.jpg'
  },
  {
    id: 144336700,
    name: '诚勇（ZeroHour Remix）',
    type: 'Single',
    date: '2022-05-02',
    tracks: ['诚勇（ZeroHour Remix）'],
    cover: '144336700.png'
  }
]
