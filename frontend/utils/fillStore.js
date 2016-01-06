/*
 * Calls a set of promises whose objective is to fill the store.
 * The store is filled by calling a static method ("fillStore") on
 * each component.
 */
export default function(redux, nextState, components) {
  return Promise.all(components.map(async Component => {
    Component = Component && Component.WrappedComponent || Component;

    if (!Component || !Component.fillStore) { return; }

    await Component.fillStore(redux, nextState);
  }));
}
