import {computed} from "vue";
import {email, maxLength, maxValue, minLength, minValue, required} from "@vuelidate/validators";
import {reactive, ref} from "vue";


const searchTerms = ref([
    {
        term: "All Summerhouse",
        selected: false,
    },
    {
        term: "All Apartment",
        selected: false,
    },
    {
        term: "All Mansion",
        selected: false,
    },
    {
        term: "All Penthouse",
        selected: false,
    },
    {
        term: "All Flat",
        selected: false,
    },
    {
        term: "All House",
        selected: true,
    }
]);



const state = reactive({
    title: '',
    price: {
        isNegotiable: false,
        price: ''
    },
    location: '',
    basic_info: {
        surface: '',
        rooms: '',
        bathrooms: '',
        floor_: '',
        heating: ''
    },
    additional_info: {
        balcony: false,
        garden: false,
        parking: false,
    },
    description: '',
    contact_details: {
        name: '',
        email: '',
        phone: ''
    },
    images: [],
    main_photo: ''
})


const countChars = computed(() => {
    return 5000 - state.description.length
})

const rules = computed(() => {
    return {
        title: {required},
        price: {
            price: {required, minValue: minValue(0)}
        },
        location: {required},
        basic_info: {
            surface: {required, minValue: minValue(0), maxValue: maxValue(10000)},
            rooms: {required, minValue: minValue(0), maxValue: maxValue(30)},
            bathrooms: {required, minValue: minValue(0), maxValue: maxValue(30)},
            floor_: {required, minValue: minValue(-2), maxValue: maxValue(100)},
            heating: {required}
        },
        description: {required, minLength: minLength(100), maxLength: maxLength(5000)},
        contact_details: {
            name: {required},
            email: {required, email},
            phone: {required, minValue: minValue(0), maxLength: maxLength(11), minLength: minLength(3)}
        },
        images: {required, minLength: minLength(3)},
        main_photo: {required}
    }
});


const setMainPhoto = (e, img) => {
    img.value.forEach(img => {
        img.classList.remove('main')
    })
    e.target.classList.toggle('main')
    state.main_photo = e.target.src;
}

const removeImages = (img, index) => {
    if (state.images.length > 3 && img !== state.main_photo) {
        state.images.splice(index, 1)
    }
};


const useBaseElements = () => {
    return {searchTerms, state, rules, countChars, setMainPhoto, removeImages}
}

export default useBaseElements