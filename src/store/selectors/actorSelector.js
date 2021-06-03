export const getActors = (state) => {
    return state.actors.list;
};

export const getJointFilms = (state) => {
    let joint = state.actors.list.length > 0 ? state.actors.list[0].cast : [];

    for (let actors of state.actors.list) {
        let temp = [];
        for (let cast of actors.cast) {
            for (let isJoint of joint) {
                cast.id === isJoint.id && temp.push(cast)
            }
        }
        joint = temp;
    }
    return joint
};
