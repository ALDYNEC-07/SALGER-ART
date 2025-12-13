/* 
 Этот файл подключает страницу серии к маршруту /series.
 Он показывает готовую страницу серии из папки components.
 Он позволяет открывать страницу серии по прямой ссылке без дублирования кода.
*/

import SeriesPage from "../components/series/SeriesPage";

export default function SeriesRoutePage() {
  /* Этот файл просто отдаёт готовую страницу серии по адресу /series */
  return <SeriesPage />;
}
