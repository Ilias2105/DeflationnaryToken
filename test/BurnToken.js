const { expect } = require("chai");

describe("BurnToken", function () {
  
  beforeEach(async function() {
    //besoin de 2signer le proprietaire du token et l'autre signer2 pour realiser des transac
    [owner, signer2] = await ethers.getSigners();
    //informations du contrat BurnToken, deployé par owner
    BurnToken = await ethers.getContractFactory('BurnToken', owner)
    //on deploie le contrat
    burnToken = await BurnToken.deploy();
  })

  describe('transfer', function () {
    it('transfert de tokens, reduction de la supply et montant du wallet', async function() {
      let ownerBalance;
      let signer2Balance;
      let totalSupply;

      //nb tot jetons au deb av qu'il y ai eu des transac et burn
      totalSupply = await burnToken.totalSupply()
      //montant que possede le proprietaire du contrat intelligent 
      ownerBalance = await burnToken.balanceOf(owner.address)
      //pour que le test soit reussi il faut 
      expect(totalSupply).to.equal(ethers.utils.parseEther('1000'))
      expect(ownerBalance).to.equal(ethers.utils.parseEther('1000'))
      //réalisation d'un transfer de l'owner vers l'autre util
      await burnToken.connect(owner).transfer(
        signer2.address,
        ethers.utils.parseEther('100')
      )

      totalSupply = await burnToken.totalSupply() 
      ownerBalance = await burnToken.balanceOf(owner.address)
      signer2Balance = await burnToken.balanceOf(signer2.address)
      //la total supply doit avoir diminuer de 25 
      expect(totalSupply).to.equal(ethers.utils.parseEther(String(1000 - (100*0.25))))
      expect(ownerBalance).to.equal(ethers.utils.parseEther('900'))
      expect(signer2Balance).to.equal(ethers.utils.parseEther('75'))
    })
  })
});
