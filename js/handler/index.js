import { $ } from '../utils/dom.js';

const handler = ({ 
    menu, 
    category, 
    changeCategory, 
    onAdd, 
    onToggleSoldOut, 
    onEdit, 
    onDelete }) => {

        const addHandler = () => {
            if($('.input').value == '') return;
            
            const isDuplicatedName = menu[category].find(item => item.name === $('.input').value);
            
            if(isDuplicatedName) {
                window.alert('이미 등록된 메뉴입니다. 다시 입력해주세요.');
                $('.input').value='';
                return;
            }
            onAdd();
        }
        
        $('.nav-list').addEventListener('click', (e) => {
            if(!e.target.classList.contains('category-name')) return;
            changeCategory(e.target.dataset.categoryName, e.target.innerText);
        });

        $('.form').addEventListener('submit', (e) => {
            e.preventDefault();
            addHandler();
        });

        $('.addBtn').addEventListener('click', () => {
            addHandler();
        });

        $('.menu-list').addEventListener('click', (e) => {
            if(!e.target.classList.contains('btn')) return;

            const BtnClassName = e.target.classList;
            const menuId = e.target.closest("li").dataset.menuId;
            const $menuName = e.target.parentNode.querySelector(".menu-name");
            const value = $menuName.innerText;

            if(BtnClassName.contains('completeBtn')){
                onToggleSoldOut(menuId);
                return;
            }

            if(BtnClassName.contains('updateBtn')){
                let nextValue = window.prompt('메뉴를 수정해주세요!',value);
                if(!nextValue) nextValue = value;
                onEdit(nextValue, menuId); 
                return;
            }

            if(BtnClassName.contains('deleteBtn')){
                onDelete(menuId);
                return;
            }
        });
}

export default handler;