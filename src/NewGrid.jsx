import React from 'react'

export const NewGrid = ({ map }) => {
  return (
        <>
    {/* Table Header */}
    <div className=' grid grid-cols-25 gap-1 w-full mt-24 text-center '>
        <div className=' rounded-sm w-full bg-slate-400 row-span-7 text-center flex items-center justify-center'>1º ano</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-4 flex items-center justify-center'></div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>1º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>2º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>3º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>4º elemento avaliação</div>

        {/* <div className='h-18 text-center  w-full bg-slate-400 col-span-1 flex items-center justify-center '></div> */}
        <div className='h-18 text-center w-full bg-slate-400 col-span-3 flex items-center justify-center'>Unidade Curricular</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Tipo avaliação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>


        {map.curricularUnits
          .filter((unit) => unit.year === "1") // Filter units where year is 1
          .map((unit) => {
            // Ensure placeholders are only calculated for units with fewer than 4 assessments
            const placeholders = 4 - unit.assessments.length;

            return (
              <React.Fragment key={unit.id}>
                {/* First two divs */}
                <div
                  key={`${unit.id}-description`}
                  className='h-16 border border-gray-300 col-span-3 text-center w-full bg-slate-100 flex items-center justify-center text-xs'
                >
                  {unit.description}
                </div>
                <div
                  key={`${unit.id}-assessment`}
                  className='h-16 border border-gray-300 col-span-1 text-center w-full bg-slate-100 flex items-center justify-center text-xs'
                >
                  {unit.assessmentType.description}
                </div>

                {/* Render all assessments for the current curricular unit */}
                {unit.assessments.map((assessment, index) => (
                  <React.Fragment key={`${unit.id}-${index}`}>
                    <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                      {assessment.assessmentClassification.description}
                    </div>
                    <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                      {assessment.weight}%
                    </div>
                    <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                      {assessment.date}
                    </div>
                    <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                      {assessment.time}
                    </div>
                    <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                      {assessment.classroom}
                    </div>
                  </React.Fragment>
                ))}

                {/* Add placeholders if there are fewer than 4 assessments */}
                {placeholders > 0 &&
                  Array.from({ length: placeholders }).map((_, index) => (
                    <React.Fragment key={`placeholder-${unit.id}-${index}`}>
                      <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                      <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                      <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                      <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                      <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                    </React.Fragment>
                  ))}
              </React.Fragment>
            );
          })}

      <div className=' rounded-sm w-full bg-slate-400 row-span-5 text-center flex items-center justify-center'>2º ano</div>
      {map.curricularUnits
                .filter((unit) => unit.year === "1") // Filter units where year is 1
                .map((unit) => {
                  // Ensure placeholders are only calculated for units with fewer than 4 assessments
                  const placeholders = 4 - unit.assessments.length;

                  return (
                    <React.Fragment key={unit.id}>
                      {/* First two divs */}
                      <div
                        key={`${unit.id}-description`}
                        className='h-16 border border-gray-300 col-span-3 text-center w-full bg-slate-200 flex items-center justify-center text-xs'
                      >
                        {unit.description}
                      </div>
                      <div
                        key={`${unit.id}-assessment`}
                        className='h-16 border border-gray-300 col-span-1 text-center w-full bg-slate-200 flex items-center justify-center text-xs'
                      >
                        {unit.assessmentType.description}
                      </div>

                      {/* Render all assessments for the current curricular unit */}
                      {unit.assessments.map((assessment, index) => (
                        <React.Fragment key={`${unit.id}-${index}`}>
                          <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16">
                            {assessment.assessmentClassification.description}
                          </div>
                          <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16">
                            {assessment.weight}%
                          </div>
                          <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16">
                            {assessment.date}
                          </div>
                          <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16">
                            {assessment.time}
                          </div>
                          <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16">
                            {assessment.classroom}
                          </div>
                        </React.Fragment>
                      ))}

                      {/* Add placeholders if there are fewer than 4 assessments */}
                      {placeholders > 0 &&
                        Array.from({ length: placeholders }).map((_, index) => (
                          <React.Fragment key={`placeholder-${unit.id}-${index}`}>
                            <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                            <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                            <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                            <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                            <div className="bg-slate-200 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                          </React.Fragment>
                        ))}
                    </React.Fragment>
                  );
                })}

      <div className=' rounded-sm w-full bg-slate-400 row-span-5 text-center flex items-center justify-center'>3º ano</div>
            {map.curricularUnits
                      .filter((unit) => unit.year === "1") // Filter units where year is 1
                      .map((unit) => {
                        // Ensure placeholders are only calculated for units with fewer than 4 assessments
                        const placeholders = 4 - unit.assessments.length;

                        return (
                          <React.Fragment key={unit.id}>
                            {/* First two divs */}
                            <div
                              key={`${unit.id}-description`}
                              className='h-16 border border-gray-300 col-span-3 text-center w-full bg-slate-100 flex items-center justify-center text-xs'
                            >
                              {unit.description}
                            </div>
                            <div
                              key={`${unit.id}-assessment`}
                              className='h-16 border border-gray-300 col-span-1 text-center w-full bg-slate-100 flex items-center justify-center text-xs'
                            >
                              {unit.assessmentType.description}
                            </div>

                            {/* Render all assessments for the current curricular unit */}
                            {unit.assessments.map((assessment, index) => (
                              <React.Fragment key={`${unit.id}-${index}`}>
                                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                                  {assessment.assessmentClassification.description}
                                </div>
                                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                                  {assessment.weight}%
                                </div>
                                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                                  {assessment.date}
                                </div>
                                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                                  {assessment.time}
                                </div>
                                <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16">
                                  {assessment.classroom}
                                </div>
                              </React.Fragment>
                            ))}

                            {/* Add placeholders if there are fewer than 4 assessments */}
                            {placeholders > 0 &&
                              Array.from({ length: placeholders }).map((_, index) => (
                                <React.Fragment key={`placeholder-${unit.id}-${index}`}>
                                  <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                                  <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                                  <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                                  <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                                  <div className="bg-slate-100 border border-gray-300 flex items-center justify-center w-full h-16"></div>
                                </React.Fragment>
                              ))}
                          </React.Fragment>
                        );
                      })}
   </div>
   </>
  )
}
