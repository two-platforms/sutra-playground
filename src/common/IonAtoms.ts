export type IonAtom = {
    name: string;
    avatar: string;
    atomId: string;     // only used by Orbyt
    online: boolean;    // only used by Orbyt
};

export type IonCrew = {
    crewName: string;
    atoms: IonAtom[];
};

const CREW_EN: IonAtom[] = [
    {
        name: 'Alora',
        avatar: '/assets/atoms/crew_en/Alora.jpg',
        atomId: 'aitana_en',
        online: true,
    },
    {
        name: 'Angela',
        avatar: '/assets/atoms/crew_en/Angela.jpg',
        atomId: 'annie_en',
        online: true,
    },
    {
        name: 'Henri',
        avatar: '/assets/atoms/crew_en/Henri.jpg',
        atomId: 'hwang_en',
        online: true,
    },
    {
        name: 'Hugo',
        avatar: '/assets/atoms/crew_en/Hugo.jpg',
        atomId: 'haejun_en',
        online: true,
    },
    {
        name: 'Jaden',
        avatar: '/assets/atoms/crew_en/Jaden.jpg',
        atomId: 'joohyuk_en',
        online: true,
    },
    {
        name: 'Jordyn',
        avatar: '/assets/atoms/crew_en/Jordyn.jpg',
        atomId: 'jinju_en',
        online: true,
    },
    {
        name: 'Millie',
        avatar: '/assets/atoms/crew_en/Millie.jpg',
        atomId: 'minjae_en',
        online: true,
    },
    {
        name: 'Misty',
        avatar: '/assets/atoms/crew_en/Misty.jpg',
        atomId: 'mato_en',
        online: true,
    },
    {
        name: 'Raynelle',
        avatar: '/assets/atoms/crew_en/Raynelle.jpg',
        atomId: 'robin_en',
        online: true,
    },
    {
        name: 'Royce',
        avatar: '/assets/atoms/crew_en/Royce.jpg',
        atomId: 'ren_en',
        online: true,
    },
    {
        name: 'Tyler',
        avatar: '/assets/atoms/crew_en/Tyler.jpg',
        atomId: 'tim_en',
        online: true,
    },
    {
        name: 'Tux',
        avatar: '/assets/atoms/crew_en/Tux.jpg',
        atomId: 'tamo_en',
        online: true,
    },
];

const CREW_KO: IonAtom[] = [
    {
        name: '아이타나',
        avatar: '/assets/atoms/crew_ko/Aitana.jpg',
        atomId: 'aitana_ko',
        online: true,
    },
    {
        name: '애니',
        avatar: '/assets/atoms/crew_ko/Annie.jpg',
        atomId: 'annie_ko',
        online: true,
    },
    {
        name: '해준',
        avatar: '/assets/atoms/crew_ko/Haejun.jpg',
        atomId: 'haejun_ko',
        online: true,
    },
    {
        name: '황',
        avatar: '/assets/atoms/crew_ko/Hwang.jpg',
        atomId: 'hwang_ko',
        online: true,
    },
    {
        name: '진주',
        avatar: '/assets/atoms/crew_ko/Jinju.jpg',
        atomId: 'jinju_ko',
        online: true,
    },
    {
        name: '주혁',
        avatar: '/assets/atoms/crew_ko/Joohyuk.jpg',
        atomId: 'joohyuk_ko',
        online: true,
    },
    {
        name: '마토',
        avatar: '/assets/atoms/crew_ko/Mato.jpg',
        atomId: 'mato_ko',
        online: true,
    },
    {
        name: '민재',
        avatar: '/assets/atoms/crew_ko/Minjae.jpg',
        atomId: 'minjae_ko',
        online: true,
    },
    {
        name: '렌',
        avatar: '/assets/atoms/crew_ko/Ren.jpg',
        atomId: 'ren_ko',
        online: true,
    },
    {
        name: '로빈',
        avatar: '/assets/atoms/crew_ko/Robin.jpg',
        atomId: 'robin_ko',
        online: true,
    },
    {
        name: '타모',
        avatar: '/assets/atoms/crew_ko/Tamo.jpg',
        atomId: 'tamo_ko',
        online: true,
    },
    {
        name: '팀',
        avatar: '/assets/atoms/crew_ko/Tim.jpg',
        atomId: 'tim_ko',
        online: true,
    },
];

const CREW_HI: IonAtom[] = [
    {
        name: 'Aditi',
        avatar: '/assets/atoms/crew_in/Aditi.jpg',
        atomId: 'aditi_in',
        online: true,
    },
    {
        name: 'Anjali',
        avatar: '/assets/atoms/crew_in/Anjali.jpg',
        atomId: 'anjali_in',
        online: true,
    },
    {
        name: 'Harsh',
        avatar: '/assets/atoms/crew_in/Harsh.jpg',
        atomId: 'harsh_in',
        online: true,
    },
    {
        name: 'Hiral',
        avatar: '/assets/atoms/crew_in/Hiral.jpg',
        atomId: 'hiral_in',
        online: true,
    },
    {
        name: 'Jai',
        avatar: '/assets/atoms/crew_in/Jai.jpg',
        atomId: 'jai_in',
        online: true,
    },
    {
        name: 'Jaya',
        avatar: '/assets/atoms/crew_in/Jaya.jpg',
        atomId: 'jaya_in',
        online: true,
    },
    {
        name: 'Mahika',
        avatar: '/assets/atoms/crew_in/Mahika.jpg',
        atomId: 'mahika_in',
        online: true,
    },
    {
        name: 'Momo',
        avatar: '/assets/atoms/crew_in/Momo.jpg',
        atomId: 'momo_in',
        online: true,
    },
    {
        name: 'Reva',
        avatar: '/assets/atoms/crew_in/Reva.jpg',
        atomId: 'reva_in',
        online: true,
    },
    {
        name: 'Ruan',
        avatar: '/assets/atoms/crew_in/Ruan.jpg',
        atomId: 'ruan_in',
        online: true,
    },
    {
        name: 'Tej',
        avatar: '/assets/atoms/crew_in/Tej.jpg',
        atomId: 'tej_in',
        online: true,
    },
    {
        name: 'Theo',
        avatar: '/assets/atoms/crew_in/Theo.jpg',
        atomId: 'theo_in',
        online: true,
    },
];

export const ALL_CREWS: IonCrew[] = [
    { crewName: 'US', atoms: CREW_EN },
    { crewName: 'Korea', atoms: CREW_KO },
    { crewName: 'India', atoms: CREW_HI },
];

export const ALL_TONES = [
    'standard',
    'clever',
    'funny',
    'playful',
    'thoughtful',
    'witty',
];
