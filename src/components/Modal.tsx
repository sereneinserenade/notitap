// import { onMounted, ref } from 'vue'
// import { v4 as uuidv4 } from 'uuid'
// import { onClickOutside } from '@vueuse/core'
// import React, { useState } from 'react'

// interface ModalProps {

// }

// const Modal: React.FC<ModalProps> = () => {
//   const modalBoxRef = useRef<HTMLDivElement | null>(null)

//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const open = () => setIsModalOpen(true)

//   const close =
// }

// const modalBoxRef = ref<HTMLDivElement | null>(null)

// const isModalOpen = ref(false)

// const open = () => isModalOpen.value = true

// const close = () => isModalOpen.value = false

// const toggle = () => isModalOpen.value = !isModalOpen.value

// const uuid = uuidv4()

// // ! TODO: handle close on Escape click
// // const onKeyPress = ({ code }: KeyboardEvent) => code === 'Escape' && close()

// onMounted(() => {
//   setTimeout(() => {
//     if (!modalBoxRef.value) return

//     onClickOutside(modalBoxRef, close)

//     // window.addEventListener('keypress', onKeyPress)
//   }, 100)

// })

// // onUnmounted(() => {
// //   window.removeEventListener('keypress', onKeyPress)
// // })
// </script>

// <template>
//   <!-- The button to open modal -->
//   <slot
//     name="trigger"
//     :open-modal="open"
//     :close-modal="close"
//     :toggle-modal="toggle"
//   />

//   <!-- Put this part before </body> tag -->
//   <Teleport to="body">
//     <input
//       :id="uuid"
//       type="checkbox"
//       class="modal-toggle"
//       :checked="isModalOpen"
//     >

//     <div class="modal">
//       <div
//         ref="modalBoxRef"
//         class="modal-box relative flex flex-col gap-4"
//       >
//         <span
//           class="btn btn-sm btn-circle absolute right-2 top-2"
//           @click.stop.prevent="close"
//         >
//           <i class="i-mdi-close" />
//         </span>

//         <h3 class="text-lg font-bold">
//           <slot name="title" />
//         </h3>

//         <slot name="default" />
//       </div>
//     </div>
//   </Teleport>
// </template>

// <style scoped>
// </style>
