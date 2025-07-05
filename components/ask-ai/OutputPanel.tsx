'use client'

import { useState } from 'react'
import { Separator } from '../ui/separator'
import { ScrollArea } from '../ui/scroll-area'
import AITextLoading from '../kokonutui/ai-text-loading'

export default function OutputPanel() {
  const [output, setOutput] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="font-geist hidden w-full flex-col text-sm font-semibold md:flex md:w-1/2">
      {/* heading */}
      <div className="mt-4 mb-4 ml-6 text-[22px] font-bold tracking-tight">
        <p>AI Response</p>
        <p className="text-muted-foreground mt-0.5 w-sm text-sm font-medium tracking-normal">
          AI results — including formatted code, markdown, and insights — will
          be shown here.
        </p>
      </div>
      <Separator />
      {/* content */}
      <div className="font-base flex-1 px-8 pt-6 pb-8">
        <ScrollArea className="h-full max-h-[600px] overflow-y-auto">
          {/* {isLoading ? <AITextLoading /> : <p>Content Loaded</p>} */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            porttitor fringilla tellus, ut rutrum erat tincidunt et. Vestibulum
            lacus ante, tempus sed mattis sit amet, molestie et sapien. Integer
            consectetur sodales felis, id facilisis urna dapibus vitae. Integer
            sagittis risus vitae mauris euismod, vel imperdiet augue vestibulum.
            Donec nec cursus arcu, aliquet sodales libero. Nunc enim orci,
            porttitor nec ornare sit amet, dapibus in nunc. Nam quis dolor sit
            amet enim molestie eleifend a sit amet mi. Mauris quis vulputate
            urna, sit amet euismod elit. Aliquam luctus at massa eu ultricies.
            Mauris pellentesque vehicula lacinia. Maecenas feugiat neque ex, ac
            facilisis dolor accumsan in. Mauris imperdiet enim et odio
            pellentesque, sed vestibulum enim molestie. Vivamus nec risus et
            turpis ullamcorper feugiat. Ut neque velit, pulvinar ut rhoncus non,
            interdum eget lacus. Proin scelerisque, diam sed facilisis interdum,
            libero mauris fermentum lorem, at congue metus metus elementum diam.
            Nullam eu maximus libero, sit amet maximus mi. Nunc accumsan felis
            accumsan felis commodo sagittis. Curabitur ex mi, aliquet ut
            eleifend at, porttitor a dui. Sed rhoncus ac sapien eget eleifend.
            In tempor tortor nec dui pretium mollis euismod sed augue. Phasellus
            efficitur dolor a nisl varius volutpat. Donec viverra dui nulla, id
            tempus lorem mollis nec. Praesent eget aliquet velit. Cras vel
            consequat diam, sit amet ultricies sem. Proin at commodo neque, a
            facilisis purus. Quisque porta nunc vitae urna pretium vulputate.
            Vivamus lacus justo, bibendum sed tortor a, placerat rutrum purus.
            Cras semper, nunc non volutpat fringilla, ex sapien aliquam mi, vel
            commodo nulla est eu turpis. Sed eget dignissim ipsum, in tincidunt
            quam. Praesent massa risus, eleifend sed vestibulum vel, aliquam in
            velit. Duis pulvinar erat mi, quis sodales nunc accumsan et. Nullam
            venenatis est interdum lorem dictum consectetur. Ut porttitor, nibh
            vulputate fermentum porttitor, eros elit condimentum magna, a
            tincidunt massa sem quis nisi. Phasellus vel rhoncus est. Vestibulum
            vitae euismod purus, a lacinia nisi. Praesent risus risus, fringilla
            in iaculis ut, volutpat ac felis. Proin eu magna quam. Pellentesque
            consectetur eu nunc vel ultrices. Mauris vitae orci sed orci
            ullamcorper posuere a vel neque. Nunc quis hendrerit dolor. In non
            laoreet tellus.Vivamus lacus justo, bibendum sed tortor a, placerat
            rutrum purus. Cras semper, nunc non volutpat fringilla, ex sapien
            aliquam mi, vel commodo nulla est eu turpis. Sed eget dignissim
            ipsum, in tincidunt quam. Praesent massa risus, eleifend sed
            vestibulum vel, aliquam in velit. Duis pulvinar erat mi, quis
            sodales nunc accumsan et. Nullam venenatis est interdum lorem dictum
            consectetur. Ut porttitor, nibh vulputate fermentum porttitor, eros
            elit condimentum magna, a tincidunt massa sem quis nisi. Phasellus
            vel rhoncus est. Vestibulum vitae euismod purus, a lacinia nisi.
            Praesent risus risus, fringilla in iaculis ut, volutpat ac felis.
            Proin eu magna quam. Pellentesque consectetur eu nunc vel ultrices.
            Mauris vitae orci sed orci ullamcorper posuere a vel neque. Nunc
            quis hendrerit dolor. In non laoreet tellus.
          </p>
        </ScrollArea>
      </div>
    </div>
  )
}
