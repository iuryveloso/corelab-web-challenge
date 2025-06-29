'use client'
import Image from 'next/image'
import Card from '@/components/card'
import CardButton from '@/components/cardButton'

export default function Login() {
  return (
    <div>
      <div className={'relative'}>
        <div className={'fixed inset-x-0 top-0'}>
          <nav
            className={
              'flex flex-col flex-wrap bg-white px-5 py-1 shadow-md sm:flex-row'
            }
          >
            <div className={'mb-3 flex items-center sm:mb-0'}>
              <div className={'mr-1'}>
                <a href="/dashboard">
                  <Image
                    src={'/logo.svg'}
                    width={35}
                    height={35}
                    alt={'Main logo'}
                    priority={true}
                  />
                </a>
              </div>
              <label className={'mr-7 text-xl text-gray-500'}>CoreNotes</label>
            </div>
            <div
              className={'flex items-center justify-center md:justify-start'}
            >
              <div className={'flex shadow-md w-80 lg:w-2xl'}>
                <input
                  className={`w-full rounded-l-sm border-y-2 border-l-2 border-gray-300 px-3 py-1 outline-none`}
                  placeholder={'Pesquisar notas'}
                />
                <div
                  className={`flex items-center rounded-r-sm border-y-2 border-r-2 border-gray-300 px-3 py-1 text-gray-400`}
                >
                  <Image
                    src={'/icons/search.svg'}
                    width={20}
                    height={20}
                    alt={'Input Icon'}
                    priority={true}
                    className={'cursor-pointer'}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className={'mt-28 sm:mt-16'}>
        <div className={'relative z-0'}>
          <div className={'fixed inset-y-14 right-0 z-10 mr-2'}>
            <div className={'flex flex-col'}>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-red-300 px-3 py-2 shadow-md`}
              >
                Errors
              </div>
              <div
                className={`mt-1 flex flex-col items-center rounded-sm bg-green-300 px-3 py-2 shadow-md`}
              >
                Messages
              </div>
            </div>
          </div>
        </div>

        <div className={'mt-3 flex justify-center'}>
          <div className={'h-40 w-80 rounded-2xl bg-white shadow-md lg:w-2xl'}>
            <div className={'flex border-b border-gray-400'}>
              <input
                type={'text'}
                className={'grow px-3 py-2 font-semibold outline-none'}
                placeholder={'Título'}
              />
              <CardButton
                icon={'/icons/star_fill.svg'}
                className={'mx-3 my-2 h-auto w-5'}
              />
            </div>
            <div className={'flex'}>
              <textarea
                className={`grow resize-none px-3 py-2 outline-none`}
                placeholder={'Criar nota...'}
                rows={4}
              />
              <div className={'flex flex-col justify-end'}>
                <CardButton
                  icon={'/icons/save.svg'}
                  className={'mx-3 my-2 h-auto w-5'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-wrap justify-center'}>
          <div>
            <div className={'mt-5 text-center'}>
              <h3 className={'text-xl'}>Favoritos</h3>
            </div>
            <div className={'flex flex-wrap justify-center'}>
              <Card color={'blue'} favorited={true} />
            </div>
          </div>
          <div>
            <div className={'mt-5 text-center'}>
              <h3 className={'text-xl'}>Outros</h3>
            </div>
            <div className={'flex flex-wrap justify-center'}>
              <Card color={'yellow'} favorited={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
