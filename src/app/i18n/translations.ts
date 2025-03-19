export const translations = {
  en: {
    settings: "Settings",
    language: "Language",
    english: "English",
    chinese: "Chinese",
    addTodo: "Add Todo",
    deleteTodo: "Delete",
    editTodo: "Edit",
    placeholder: "What needs to be done?",
    title: "✨ Todo List",
    tag_work: "Work",
    tag_study: "Study",
    tag_life: "Life",
    tag_other: "Other"
  },
  zh: {
    settings: "设置",
    language: "语言",
    english: "英文",
    chinese: "中文",
    addTodo: "添加待办",
    deleteTodo: "删除",
    editTodo: "编辑",
    placeholder: "需要做什么？",
    title: "✨ 待办清单",
    tag_work: "工作",
    tag_study: "学习",
    tag_life: "生活",
    tag_other: "其他"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;