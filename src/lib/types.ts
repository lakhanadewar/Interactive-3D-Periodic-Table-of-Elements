export interface ElementData {
  name: string;
  atomic_mass: number;
  category: string;
  discovered_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  summary: string;
  symbol: string;
  xpos: number;
  ypos: number;
  shells: number[];
  electron_configuration: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  ionization_energies: (number | null)[];
  cpkHex: string | null;
  bohr_model_image: string | null;
  bohr_model_3d: string | null;
}
