# Empire
Experimental

Notes:
	Definitions of Terms

Miner - Creeps that go to sources and mine energy.  They don't move just sit there and mine dropping energy right there..
Repair - Creeps that have work to do
	Build roads etc
	Repair roads etc
Builder - 
	Major Builds
	Upgrade Controller
Medics - Creeps that have healing to do
Runner - Creeps that transfer energy.
Bouncer - Handle Keeper

Builder(bld) - MOVE,CARRY, rest is WORK
				3*MOVE,2*CARRY,12*WORK,MOVE
Miner(min) - MOVE, rest is WORK
Medics(med) - MOVE, 4*HEAL
Runner(run) - CARRY,MOVE,CARRY,MOVE
Repair(rep) - CARRY,MOVE,WORK,WORK,WORK
Guard(grd) - 3*TOUGH,2*MOVE,6*RANGED_ATTACK,MOVE

Creep States Miner
0 - Idle
10 - Mining
20 - Travelling to Source
