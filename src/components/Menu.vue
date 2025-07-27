<template>
<div class="menu">
    <header>
      <div class="nav-container">
        <div class="logo">
          <i class="fas fa-utensils"></i>
          <span>欢迎来到小刘大厨！</span>
        </div>
        <div class="nav-icons">
          <i class="fas fa-search"></i>
          <i class="fas fa-user"></i>
        </div>
      </div>
    </header>
    
    <!-- 分类筛选 -->
    <div class="container">
      <div class="categories">
        <div 
          v-for="(category, index) in categories" 
          :key="index" 
          class="category" 
          :class="{ active: activeCategory === category }"
          @click="activeCategory = category"
        >
          {{ category }}
        </div>
      </div>
      
      <!-- 菜品列表 -->
      <div class="menu-container">
        <div 
          v-for="(item, index) in filteredMenu" 
          :key="index" 
          class="menu-item"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name">
          </div>
          <div class="item-content">
            <div class="item-header">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-description">{{ item.description }}</p>
            </div>
            <div class="item-footer">
              <div class="item-price">¥{{ item.price }}</div>
              <button 
                class="add-to-cart" 
                @click="addToCart(item)"
                :class="{ pop: item.added }"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 购物车 -->
    <!--
    <div class="cart">
      <div class="cart-info">
        <div class="cart-icon">
          <i class="fas fa-shopping-cart"></i>
          <div class="cart-count">{{ cartTotalQuantity }}</div>
        </div>
        <div class="cart-text">
          <div>购物车</div>
          <div class="cart-total">¥{{ cartTotalPrice }}</div>
        </div>
      </div>
      <button class="checkout-btn">去结算</button>
    </div>
    -->
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import feichang from '@/components/pics/feichang.png'
import friedInstantNoodles from '@/components/pics/炒方便面.jpg'
import hongshaorou from '@/components/pics/红烧肉.jpg'
import malaxiaolongxia from '@/components/pics/麻辣小龙虾.jpg'
import hongshaopaigu from '@/components/pics/红烧排骨.jpg'
import liufeichang from '@/components/pics/溜肥肠.jpg'
import hupifengzhua from '@/components/pics/脱骨凤爪.jpg'

const categories = ref(['全部', '特色小炒', '特色红烧', '啤酒拍档', '主食'])
const activeCategory = ref('全部')

// 菜单数据
const menu = ref([
    {
    id: 1,
    name: '干煸肥肠',
    description: '焦脆的外皮下是柔韧耐嚼的满足感，麻辣鲜香瞬间点燃味蕾，脂香醇厚却丝毫不腻',
    price: 58,
    image: feichang,
    category: '特色小炒',
    added: false
    },
    {
    id: 2,
    name: '炒方便面',
    description: '方便面搭配经典王中王，微辣口感，香气扑鼻',
    price: 22,
    image: friedInstantNoodles,
    category: '主食',
    added: false
    },
    {
    id: 3,
    name: '红烧肉',
    description: '色泽透亮、文火慢炖、酱香软糯',
    price: 58,
    image: hongshaorou,
    category: '特色红烧',
    added: false
    },
    {
    id: 4,
    name: '麻辣小龙虾',
    description: '鲜麻辛香、活虾爆炒、吮指回味',
    price: 98,
    image: malaxiaolongxia,
    category: '啤酒拍档',
    added: false
    },
    {
    id: 5,
    name: '红烧排骨',
    description: '焦糖酱色、骨肉酥脱、慢火煨炖',
    price: 58,
    image: hongshaopaigu,
    category: '特色红烧',
    added: false
    },
    {
    id: 6,
    name: '溜肥肠',
    description: '猛火爆炒、烟火香气、回味悠长',
    price: 28,
    image: liufeichang,
    category: '特色小炒',
    added: false
    },
    {
    id: 7,
    name: '虎皮凤爪',
    description: '文火慢炖、软烂脱骨、回味无穷',
    price: 58,
    image: hupifengzhua,
    category: '啤酒拍档',
    added: false
    }
])

// 购物车数据
const cart = ref([])

// 计算属性 - 过滤菜单
const filteredMenu = computed(() => {
    if (activeCategory.value === '全部') {
    return menu.value
    }
    return menu.value.filter(item => item.category === activeCategory.value)
})

// 计算属性 - 购物车总数量
const cartTotalQuantity = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
})

// 计算属性 - 购物车总价格
const cartTotalPrice = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
})

// 添加到购物车
const addToCart = (item) => {
    // 添加动画效果
    item.added = true
    setTimeout(() => {
    item.added = false
    }, 300)
    
    // 查找是否已在购物车中
    const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
    existingItem.quantity++
    } else {
    cart.value.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
    })
    }
}
</script>

<style scoped>
@import '../assets/menu.css';
</style>