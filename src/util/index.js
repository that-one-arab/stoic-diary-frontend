import store from '@/store';

export function createBlankPage() {
  const sectionNames = ['whatWentWrong', 'whatWentRight', 'whatCanBeImproved'];

  sectionNames.forEach((sectionName) => {
    store.commit('setPageSection', { sectionName, value: [{ value: '' }] });
  });
}
