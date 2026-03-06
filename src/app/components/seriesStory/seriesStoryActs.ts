/* 
 Логика этого файла описывает «сюжет» серии из трёх актов.
 Она возвращает название акта по номеру работы и форматирует прогресс вида «07 / 18».
 Этот файл нужен, чтобы мобильный и desktop режимы всегда считали акты одинаково.
*/

export const ACT_LABELS = ["Пролог", "Перелом", "Эхо"] as const;

export type ActLabel = (typeof ACT_LABELS)[number];

/* Определяем акт по месту работы в серии. 
 Для 1 работы это всегда «Пролог».
 Для 2 работ получаем «Пролог» и «Эхо».
 Для 3 и более работ делим путь на три последовательные части.
*/
export const getActLabelByIndex = (index: number, length: number): ActLabel => {
  if (length <= 1) {
    return ACT_LABELS[0];
  }

  const safeIndex = Math.max(0, Math.min(index, length - 1));
  const progress = safeIndex / (length - 1);

  if (progress < 1 / 3) {
    return ACT_LABELS[0];
  }

  if (progress < 2 / 3) {
    return ACT_LABELS[1];
  }

  return ACT_LABELS[2];
};

/* Приводим номер к виду «07», чтобы прогресс везде выглядел одинаково */
export const formatProgressValue = (value: number): string => {
  return String(Math.max(0, value)).padStart(2, "0");
};
