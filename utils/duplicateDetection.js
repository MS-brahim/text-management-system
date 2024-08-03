const duplicateDetection = (entries) => {
    const duplicates = [];
    const contentSet = new Set();

    entries.forEach((entry) => {
        if (contentSet.has(entry.content)) {
            duplicates.push(entry);
        } else {
            contentSet.add(entry.content);
        }
    });

    return duplicates;
};

export default duplicateDetection;
