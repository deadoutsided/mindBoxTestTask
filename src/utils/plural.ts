export default function plural(value: number, variants: Partial<Record<Intl.LDMLPluralRule, string>>, locale = 'en-EN') {
    // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
    // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
    // В английском 2 формы: 'one', 'other'
    const key = new Intl.PluralRules(locale).select(value);
    // Возвращаем вариант по ключу, если он есть
    return variants[key] || '';
  }