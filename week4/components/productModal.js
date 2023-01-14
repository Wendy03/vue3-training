import { Toast } from '../../js/helper.js';
import { apiUrl, apiPath } from '../../js/config.js';

export default {
  template: `
   <div
  id="productModal"
  ref="productModal"
  class="modal fade"
  tabindex="-1"
  aria-labelledby="productModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{ isNew ? '新增' : '編輯' }}產品</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label h4"
                  >輸入主圖網址</label
                >
                <input
                  v-model="product.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <img
                class="img-fluid"
                :src="product.imageUrl"
                :alt="product.title"
              />
              
              <div class="form-group">
                <label for="customFile"
                  >或 上傳圖片
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="files"
                  @change="uploadFile"
                />
              </div>
            </div>
            
            <hr/>
            <p class="mb-3 h4 pt-4">多圖新增</p>
            <template v-if="Array.isArray(product.imagesUrl)">
              <div
                class="mb-1"
                v-for="(image, key) in product.imagesUrl"
                :key="image"
              >
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"
                    >圖片網址</label
                  >
                  <input
                    v-model="product.imagesUrl[key]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img class="img-fluid" :src="image" />
              </div>
              <div
                v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]"
              >
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="product.imagesUrl.push('')"
                >
                  新增圖片
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-danger btn-sm d-block w-100"
                  @click="product.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
            </template>
            <div v-else>
              <button
                class="btn btn-outline-primary btn-sm d-block w-100"
                @click="createImages"
              >
                新增圖片
              </button>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題</label>
              <input
                id="title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
                v-model="product.title"
              />
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類"
                  v-model="product.category"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input
                  id="unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位"
                  v-model="product.unit"
                />
              </div>
            </div>

            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input
                  id="origin_price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入原價"
                  v-model.number="product.origin_price"
                />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入售價"
                  v-model.number="product.price"
                />
              </div>
            </div>
            <hr />

            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入產品描述"
                v-model="product.description"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容"
                v-model="product.content"
              >
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  v-model="product.is_enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="is_enabled"
                  >{{ product.is_enabled ? "啟用" : "未啟用"}}</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :disabled = "isProcessing"
          @click.prevent="updateProduct"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
  props: ['product', 'isNew'],
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    updateProduct() {
      let httpMethod = 'post';
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      if (!this.isNew) {
        httpMethod = 'put';
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.product.id}`;
      }
      axios[httpMethod](url, { data: this.product })
        .then((res) => {
          Toast.fire({
            title: `${res.data.message}`,
            icon: 'success',
          });
          this.isProcessing = true;
          this.$emit('close', 'updateData');
          this.$emit('update');
        })
        .catch((err) => {
          console.dir(err);
          const errMessage = err.response
            ? err.response.data.message
            : err.data?.message;
          Toast.fire({
            title: `${errMessage}`,
            icon: 'error',
          });
        });
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    uploadFile() {
      const upLoadedFile = document.querySelector('#customFile').files[0];
      // 轉成 Form Data
      const formData = new FormData();
      formData.append('file-to-upload', upLoadedFile);
      axios
        .post(`${apiUrl}/api/${apiPath}/admin/upload`, formData)
        .then((res) => {
          this.product.imageUrl = res.data.imageUrl;
          document.querySelector('#customFile').value = '';
        })
        .catch((_err) => {
          Toast.fire({
            title: '檔案格式不符',
            icon: 'error',
          });
        });
    },
  },
};
