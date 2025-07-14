function smartassign(tasks) {
  let m = {};
  tasks.forEach((item) => {
    if (m[item.assignedUser]) {
      m[item.assignedUser]++;
    } else m[item.assignedUser] = 1;
  });
  let l = Number.MAX_SAFE_INTEGER;
  let username;
  for (let i in m) {
    if (l > m[i]) {
      l = m[i];
      username = i;
    }
  }
  return username;
}

export default { smartassign };
