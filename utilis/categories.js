const categories = [
"Arts & Photography",
"Biographies & Memoirs",
"Business & Money",
"Calendars",
"Children's Books",
"Christian Books & Bibles",
"Comics & Graphic Novels",
"Computers & Technology",
"Cookbooks, Food & Wine",
"Crafts, Hobbies & Home",
"Education & Teaching",
"Engineering & Transportation",
"Health, Fitness & Dieting",
"History",
"Humor & Entertainment",
"Law",
"Literature & Fiction",
"Medical Books",
"Mystery, Thriller & Suspense",
"Parenting & Relationships",
"Philosophy",
"Politics & Social Sciences",
"Reference",
"Religion & Spirituality",
"Romance",
"Science & Math",
"Science Fiction & Fantasy",
"Self-Help",
"Sports & Outdoors",
"Teen & Young Adult",
"Test Preparation",
"Travel",
]
export default categories
export const getCategoryIndex = (category) => {
    let index = 0
    categories.map((cat, i) => {
        if (cat === category) {
            index = i
        }
    })
    return index
}

export const getCategory = (categoryIndex) => {
    let category = ""
    categories.map((cat, i) => {
        if (categoryIndex == i) {
            category = cat
        }
    })

    return category
}