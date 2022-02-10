import assert from 'assert'
import { ethers } from 'hardhat'

describe('Proxy simple', function () {

  it('Should change field num in Proxy state', async function () {
    const logic = await (await ethers.getContractFactory('Logic')).deploy()
    const proxyDeploy = await (await ethers.getContractFactory('Proxy')).deploy(logic.address)
    const proxy = await ethers.getContractAt('Logic', proxyDeploy.address)
    const res = await (await proxy.callStatic.setNum('5', '3'))

    console.log('callStatic 8 >>', +res)
    assert(+res === 8, 'callStatic 5, 3 must return 8, but: ' + await proxy.num())
    await (await proxy.setNum('2', '3')).wait()

    console.log('proxy.num() 5 >> ', +await proxy.num())
    console.log('proxy.num1() 6 >>', +await proxy.num1())
    assert(+await proxy.num() === 5, 'proxy num shoul be is 5, but: ' + await proxy.num())
    assert(+await logic.num() === 0, 'logyc num should be is 0, but: ' + await logic.num())

    await (await proxy.setVar1('2')).wait()
    console.log('proxy.var1() 2 >>', +await proxy.var1())
    console.log('proxy.var2() 0 >>', +await proxy.var2())
    console.log('proxy.getVar1() 2 >>', +await proxy.getVar1())
    console.log('logic.getVar1() 0 >>', +await logic.getVar1())

    assert(+await proxy.var1() === 2, 'proxy var1 shoul be is 2, but: ' + +await proxy.var1())
    assert(+await proxy.var2() === 0, 'proxy var2 shoul be is 0, but: ' + +await proxy.var2())
    assert(+await logic.var1() === 0, 'logyc var1 should be is 0, but: ' + await logic.var1())
    assert(+await proxy.getVar1() === 2, 'view getVar1 should return 2, but: ' + +await proxy.getVar1())

  })
})