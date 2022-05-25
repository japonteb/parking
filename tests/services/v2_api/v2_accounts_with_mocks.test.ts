import { createAccount, } from '../../../services/v2_api/v2_accounts';

vi.mock('ky')



describe('v2_accounts', () => {

 

  it('creates an account',async () => {
    const {result, gid} = await createAccount('newUser', 'newPassword');
    expect(result === 'OK').toBe(true);
    expect(gid).toBe('1');
  })

  it('login fails to create an account when result is FAIL',async ()=>{ 

    await expect(createAccount('badUserName', 'badPassword')).rejects.toThrow();
  })
  
})
