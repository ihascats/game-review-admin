import Icon from '@mdi/react';
import {
  mdiEye,
  mdiEyeOff,
  mdiPencil,
  mdiDelete,
  mdiArrowLeft,
  mdiPlus,
  mdiHome,
  mdiContentSave,
  mdiClose,
  mdiCloseCircle,
  mdiCheck,
  mdiLoading,
  mdiLogout,
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
    <Icon
      path={mdiPlus}
      size={2}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const home = (
    <Icon
      path={mdiHome}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const save = (
    <Icon
      path={mdiContentSave}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const cancel = (
    <Icon
      path={mdiClose}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const cancelSearch = (
    <Icon
      path={mdiCloseCircle}
      size={0.9}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const check = (
    <Icon
      path={mdiCheck}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const loading = (
    <Icon
      path={mdiLoading}
      size={1.5}
      horizontal
      vertical
      rotate={180}
      color="inherit"
      spin
    />
  );

  const logout = (
    <Icon
      path={mdiLogout}
      size={1}
      horizontal
      vertical
      rotate={180}
      color="inherit"
    />
  );

  const icons = {
    published,
    unpublished,
    edit,
    deleteReview,
    back,
    createNew,
    home,
    save,
    cancel,
    cancelSearch,
    check,
    loading,
    logout,
  };

  return icons;
}
