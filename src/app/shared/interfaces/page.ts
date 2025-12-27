export interface Page<T> {
  content: T[];
  number: number;           // page courante
  size: number;             // taille page
  numberOfElements: number; // éléments dans la page
  totalElements: number;    // TOTAL (clé pour paginator)
  totalPages: number;
}
