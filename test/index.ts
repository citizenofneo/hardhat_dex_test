import assert from 'assert'
import { ethers } from 'hardhat'

describe('Proxy simple', function () {

  it('Should change field num in Proxy state', async function () {
    const logic = await (await ethers.getContractFactory('Logic')).deploy()
    const proxy = await (await ethers.getContractFactory('Proxy')).deploy(logic.address)
    await (await proxy.setVars('5')).wait()
    assert(+await proxy.num() === 5, 'proxy num shoul be is 5')
    assert(+await logic.num() === 0, 'logyc num should be is 0')
  })
})