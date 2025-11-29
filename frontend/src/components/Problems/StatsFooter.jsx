import React from 'react'

function StatsFooter({problems}) {
    const easyProblemCount=problems.filter(problem=>problem.difficulty==="Easy");
    const mediumProblemCount=problems.filter(problem=>problem.difficulty==="Medium");
    const hardProblemCount=problems.filter(problem=>problem.difficulty==="Hard");
  return (
    <div className='mt-12 card bg-base-100 shadow-lg'>
        <div className='card-body'>

            <div className='stats stats-vertical lg:stats-horizontal'>
                <div className='stat'>
                    <div className='stat-title'>Total Problems</div>
                    <div className='stat-value text-primary'>{problems.length}</div>
                </div>
                <div className='stat'>
                    <div className='stat-title'>Easy</div>
                    <div className='stat-value text-success'>{easyProblemCount.length}</div>
                </div>
                <div className='stat'>
                    <div className='stat-title'>Medium</div>
                    <div className='stat-value text-warning'>{mediumProblemCount.length}</div>
                </div>
                <div className='stat'>
                    <div className='stat-title'>Hard</div>
                    <div className='stat-value text-error'>{hardProblemCount.length}</div>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default StatsFooter
