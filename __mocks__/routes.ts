
export const routes = [
['v2_accounts/createAccount.php',{email:'newUser',password:'newPassword'}, {result:'OK', gid: "1"}],
['v2_accounts/createAccount.php',{email:'badUserName',password:'badPassword'}, {result:'FAIL'}],
]

