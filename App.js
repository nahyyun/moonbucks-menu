import { $ } from './js/utils/dom.js';
import API from './js/api/index.js';
import { menuContainerTemplate } from './js/template/menuContainerTemplate.js';
import { menuBarTemplate } from './js/template/menuBarTemplate.js';
import initEventListener from './js/handler/index.js';

function App(){
    this.menu  = {
        'espresso': [],
        'frappuccino': [], 
        'blended': [],
        'teavana': [], 
        'desert': []
    };

    this.category = '';
    this.categoryName = '';

    const changeCategory = (clickedCategory, categoryName) => {
        this.category = clickedCategory;
        this.categoryName = categoryName;
        renderMenuList();
    }

    const updateCategory = () => {
        $('.menu-title').innerText = `${this.categoryName} 메뉴 관리`;
        $('.total-cnt').innerText = `총 ${this.menu[this.category].length} 개`;
    }

    const onAdd = async() => {
        await API.addMenu(this.category, $('.input').value);
        $('.input').value='';
        renderMenuList();
    }

    const onToggleSoldOut = async(menuId) => {
        await API.completeMenu(this.category, menuId);
        renderMenuList();
    }

    const onEdit = async(value, menuId) => {
        await API.updateMenu(this.category, menuId, value);
        renderMenuList();
    }
    
    const onDelete = async(menuId) => {
        if(window.confirm('삭제하시겠습니까?')){
            await API.deleteMenu(this.category, menuId);
            renderMenuList();
        }
    }
    
    const renderMenuList = async() => {
        this.menu[this.category] = await API.getMenu(this.category);
        $('.menu-list').innerHTML = `
            ${this.menu[this.category].map((item) => {
                return `
                <li data-menu-id=${item.id}>
                    <span class= "menu-name ${item.isSoldOut ? 'sold-out' : ''}">${item.name}</span>
                    <button class="btn completeBtn">품절</button>
                    <button class="btn updateBtn">수정</button>
                    <button class="btn deleteBtn">삭제</button>
                </li>`
            }).join('')}
        `;
        updateCategory();
    }
    
    this.init = async() => {
        this.category = 'espresso';
        this.categoryName = '☕ 에스프레소';

        $('#app').insertAdjacentHTML('beforeend', menuBarTemplate());
        $('#app').insertAdjacentHTML('beforeend', menuContainerTemplate(this.menu, this.category, this.categoryName));
        
        renderMenuList();
        
        document.addEventListener('DOMContentLoaded', () =>{
            initEventListener({ 
                menu: this.menu,
                category: this.category,
                changeCategory, 
                onAdd, 
                onToggleSoldOut, 
                onEdit, 
                onDelete
            });
        })
    }
}

const app = new App();
app.init();