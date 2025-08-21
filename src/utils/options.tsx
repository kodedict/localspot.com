import OptionType from '@/type/option-type';

const recurringOptions : OptionType[] = ['daily', 'weekly', 'monthly', 'yearly', 'weekends', 'custom_days'].map((item: string) => ({value: item, name: item.replace('_', ' ')}));

const CustomOptions = (options: string[]) => {
    return options.map((item: string) => ({value: item, name: item.replace('_', ' ')}));
}

export { 
    recurringOptions,
    CustomOptions,
};