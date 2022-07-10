import {ref} from "vue";
const show = ref(false);

const selectedTerm = (terms) => {
    return terms.find((x) => x.selected);
};

const chooseSearchTerms = (terms, tr) => {
    terms.forEach((x) => (x.selected = false));
    tr.selected = true;
    selectedTerm(terms);
    show.value = false;
};

const useSelectChooseTerm = () => {
    return { selectedTerm, chooseSearchTerms, show}
}

export default useSelectChooseTerm;