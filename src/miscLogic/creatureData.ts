export interface CreatureData {
  ecosystems: {
    [key: string]: {
      [key: string]: {
        commonName: string;
        produces: Array<string>;
      };
    };
  };
  catalogs: {
    [key: string]: Array<string>;
  };
}

/**
 * @fileoverview Provides data for creatures which is not intended to be put into a datalist. This data is needed in multiple files, so it was broken into its own file.
 */
const creatureData: CreatureData = {
  ecosystems: {
    Ground: {
      Anastomus: {
        commonName: 'Zancadores',
        produces: ['Tall Eggs'],
      },
      Anomalous: {
        commonName: 'Criaturas exóticas de los biomas Exoticos',
        produces: ['', 'Fiendish Roe', 'Hexaberry', 'Latticed Sinew'],
      },
      Arthropodae: {
        commonName: 'Artrópodos',
        produces: ['Nourishing Slime'],
      },
      Bos: {
        commonName: 'Escarabajos',
        produces: ["Crab 'Apple'"],
      },
      Bosoptera: {
        commonName: 'Escarabajos Voladores',
        produces: ['Craw Milk'],
      },
      Felidae: {
        commonName: 'Gatos',
        produces: ['Leopard-Fruit'],
      },
      Felihex: {
        commonName: 'Gatos de seis patas',
        produces: ['Leopard-Fruit'],
      },
      Floradae: {
        commonName: 'Gatos de plantas',
        produces: ['Syrupy Nectar'],
      },
      Hexungulatis: {
        commonName: 'Vacas de seis patas',
        produces: ['Fresh Milk'],
      },
      Lok: {
        commonName: 'Masa amorfa',
        produces: ["Sticky 'Honey'"],
      },
      Mechanoceris: {
        commonName: 'Robots',
        produces: ['Chewy Wires'],
      },
      Mogara: {
        commonName: 'Proto-Gek',
        produces: ['Warm Proto-Milk'],
      },
      Osteofelidae: {
        commonName: 'Bolas de hueso',
        produces: ['Bone Nuggets'],
      },
      Prionterrae: {
        commonName: 'Arados',
        produces: [''],
      },
      Procavya: {
        commonName: 'Roedores',
        produces: ['Wild Milk'],
      },
      Protosphaeridae: {
        commonName: 'Protoroller (esferas)',
        produces: ['Bone Nuggets'],
      },
      Prototerrae: {
        commonName: 'Protodiggers (Tentaculos)',
        produces: ['Dirty Meat'],
      },
      Rangifae: {
        commonName: 'Diplos',
        produces: ['Giant Egg'],
      },
      Reococcyx: {
        commonName: 'Antílopes bípedos',
        produces: ['Wild Milk'],
      },
      Spiralis: {
        commonName: 'Taladros',
        produces: ['Latticed Sinew'],
      },
      Structurae: {
        commonName: 'Edificios andantes',
        produces: ['Chewy Wires'],
      },
      Talpidae: {
        commonName: 'Moles',
        produces: ['Foraged Mushrooms'],
      },
      Tetraceris: {
        commonName: 'Antílopes',
        produces: ['Wild Milk'],
      },
      Theroma: {
        commonName: 'Triceratops',
        produces: ['Creature Egg'],
      },
      Tyranocae: {
        commonName: 'Tiranosaurios',
        produces: ['Regis Grease'],
      },
      Ungulatis: {
        commonName: 'Vacas',
        produces: ['Fresh Milk'],
      },
    },
    Flying: {
      Agnelis: {
        commonName: 'Pajaros',
        produces: ['Craw Milk'],
      },
      Cycromys: {
        commonName: 'Dragones',
        produces: ['Craw Milk'],
      },
      Oxyacta: {
        commonName: 'Serpientes voladoras',
        produces: ['Craw Milk'],
      },
      Protocaeli: {
        commonName: 'Protoflyers (bolas raras voladoras)',
        produces: ['Craw Milk'],
      },
      Rhopalocera: {
        commonName: 'Mariposas',
        produces: ['', 'Craw Milk'],
      },
    },
    Underwater: {
      Procavaquatica: {
        commonName: 'Roedores nadadores',
        produces: ['Wild Milk'],
      },
      Bosaquatica: {
        commonName: 'Cangrejos submarinos',
        produces: ["Crab 'Apple'"],
      },
      Chrysaora: {
        commonName: 'Medusas',
        produces: ['Wild Milk'],
      },
      Ictaloris: {
        commonName: 'Peces',
        produces: [''],
      },
      Prionace: {
        commonName: 'Tiburones',
        produces: ['Wild Milk'],
      },
      Prionacefda: {
        commonName: 'Vacas nadadoras',
        produces: ['Wild Milk'],
      },
    },
    Underground: {
      Bos: {
        commonName: 'Escarabajos',
        produces: ["Crab 'Apple'"],
      },
      Lok: {
        commonName: 'Masas amorfas',
        produces: ["Sticky 'Honey'"],
      },
      Procavya: {
        commonName: 'Roedores',
        produces: ['Wild Milk'],
      },
      Prototerrae: {
        commonName: 'Protodiggers (tentaculos)',
        produces: [''],
      },
    },
  },
  catalogs: {
    Ground: ['', 'Diplo', 'Rare Beetle', 'Mechanical Fauna', 'Common Fauna', 'Rare Fauna'],
    Flying: ['', 'Common Fauna', 'Rare Fauna'],
    Underwater: ['', 'Rare Beetle', 'Common Fauna', 'Rare Fauna'],
    Underground: ['', 'Rare Beetle', 'Common Fauna', 'Rare Fauna'],
  },
};

export default creatureData;
