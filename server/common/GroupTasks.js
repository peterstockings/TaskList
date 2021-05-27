const GroupTasksBy = (tasks, column) => {
    var groupedTasks = tasks.reduce((a,v) => {
        if (v[column] in a)
            a[v[column]].push(v)
        else {
             a[v[column]] = [v]
        }
        return a
    },{})

    return Object.entries(groupedTasks).map(group => ({collection_id: group[0], tasks: group[1]}))
}

module.exports = GroupTasksBy;