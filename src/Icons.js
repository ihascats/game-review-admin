import Icon from '@mdi/react';
import {
  mdiEye,
  mdiEyeOff,
  mdiPencil,
  mdiDelete,
  mdiArrowLeft,
  mdiPlus,
} from '@mdi/js';

export default function Icons() {
  const published = (
    <Icon
      path={mdiEye}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const unpublished = (
    <Icon
      path={mdiEyeOff}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const edit = (
    <Icon
      path={mdiPencil}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const deleteReview = (
    <Icon
      path={mdiDelete}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const back = (
    <Icon
      path={mdiArrowLeft}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const createNew = (
    <Icon path={mdiPlus} size={1} horizontal vertical rotate={180} />
  );

  const icons = {
    published,
    unpublished,
    edit,
    deleteReview,
    back,
    createNew,
  };

  return icons;
}
