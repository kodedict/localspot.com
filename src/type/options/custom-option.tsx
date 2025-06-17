const CustomOptions = (options: string[]) => {
    return options.map((item: any) => ({ value: item, name: item.replace('_', ' ') }));
}

export default CustomOptions;